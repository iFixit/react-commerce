import { isRecord } from '@ifixit/helpers';
import {
   GraphQLHandler,
   RestHandler,
   RequestHandler,
   DefaultBodyType,
   GraphQLContext,
   GraphQLRequest,
   GraphQLVariables,
   PathParams,
   ResponseResolver,
   RestContext,
   RestRequest,
   rest,
   graphql,
} from 'msw';

/**
 * These methods are a subset of the GraphQL operational methods that are
 * supported by MSW's `graphql` handler. There are of course other methods
 * `MSW` supports, but we are only interested in these two for now.
 *
 * @see https://mswjs.io/docs/api/graphql#operation-kind
 */
export type GraphQLMethods = keyof Pick<typeof graphql, 'mutation' | 'query'>;

/**
 * This is the type of the resolver that is used by the `graphql` handler.
 * The resolver is a function that accepts a captured request and may return
 * a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 */
export type GraphQLResolver = ResponseResolver<
   GraphQLRequest<GraphQLVariables>,
   GraphQLContext<Record<string, any>>
>;

/**
 * These methods are a subset of the REST methods that are
 * supported by MSW's `rest` handler - _with the exception of
 * `options`_.
 *
 * @see https://mswjs.io/docs/api/rest#methods
 */
export type RestMethods = keyof Omit<typeof rest, 'options'>;

/**
 * This is the type of the resolver that is used by the `rest` handler.
 * The resolver is a function that accepts a captured request and may return
 * a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 */
export type RestResolver = ResponseResolver<
   RestRequest<DefaultBodyType, PathParams<string>>,
   RestContext,
   DefaultBodyType
>;

/**
 * The `RequestInfo` type represents the information that is needed to
 * understand which request we are trying to mock.
 */
type RequestInfo = {
   endpoint: string;
};
export type GraphQLRequestInfo = RequestInfo & {
   method: GraphQLMethods;
};
export type RestRequestInfo = RequestInfo & {
   method: RestMethods;
};

/*
 * These types represent the response options that can be passed to each respective
 * handler to configure what the response should return if the request is matched.
 */
type MockedResponseInfo = {
   status: number;
};

export type GraphQLResponseInfo = MockedResponseInfo & {
   body: Record<string, any>;
};

/**
 * The response for a Rest request can be configured in a more ways than
 * compared to a response for GraphQL request.
 *
 * @property `headers` - The headers to return with the response
 * @property `body` - The body of the response.
 * @property `responseType` - This the kind of transformation to apply to the
 * body when it will be returned. This is only applicable to REST requests
 * since GraphQL responses will only use a `data` transformer.
 *
 * @see https://mswjs.io/docs/basics/response-transformer#standards-transformers
 * @see https://mswjs.io/docs/api/context
 * @see https://mswjs.io/docs/api/response
 *
 */
export type RestResponseInfo = MockedResponseInfo & {
   headers?: Record<string, string | string[]>;
} & (RestBodyInfo | {});
type RestBodyInfo = {
   body: Record<string, any> | string | number | boolean | null;
   responseType: 'json' | 'text' | 'xml' | 'raw';
};

/**
 * These are some options that can be passed to configure the request handler.
 * @property `once` - If true, the handler will only be used once.
 * @see https://mswjs.io/docs/api/response/once
 * @property `passthrough` - If true, the request will be bypassed and performed
 * as-is.
 * @see https://mswjs.io/docs/api/request/passthrough
 * @property `customResolver` - If provided, this will be used as the resolver
 * for the handler. This is useful if you want to do something more complex than
 * just returning a static response.
 * @see https://mswjs.io/docs/basics/response-resolver
 */
export type HandlerOptions = {
   once: boolean;
   passthrough: boolean;
   customResolver?: GraphQLResolver | RestResolver;
};

export default class Handler {
   /**
    * Creates a new GraphQL handler.
    */
   static create({
      request,
      response,
      options,
   }: {
      request: Omit<RequestInfo, 'method'> & { method: GraphQLMethods };
      response: Omit<
         MockedResponseInfo,
         'headers' | 'body' | 'responseType'
      > & {
         body: Record<string, any>;
      };
      options?: HandlerOptions;
   }): GraphQLHandler;

   /**
    * Creates a new Rest Handler.
    */
   static create({
      request,
      response,
      options,
   }: {
      request: Omit<RequestInfo, 'method'> & { method: RestMethods };
      response: MockedResponseInfo;
      options?: HandlerOptions;
   }): RestHandler;

   static create({
      request,
      response,
      options = { once: false, passthrough: false },
   }: {
      request: RequestInfo;
      response: MockedResponseInfo;
      options?: HandlerOptions;
   }): RequestHandler {
      const { endpoint, method } = request;
      const { status, headers, body, responseType } = response;
      const { once, passthrough, customResolver } = options;

      if (isGraphQLMethod(method)) {
         if (!isRecord(body)) {
            throw new Error(`Invalid GraphQL body ${body}. Must be an object`);
         }

         return new GraphQLHandler(
            method,
            endpoint,
            /**
             * This refers to the Path,or location, of the endpoint. By using a
             * wildcard, we are saying that we want to match any endpoint
             * regardless of location the request is made from.
             */
            '*',
            customResolver ??
               ((req, res, ctx) => {
                  if (passthrough) return req.passthrough();
                  if (once) return res.once(ctx.status(status), ctx.data(body));

                  return res(ctx.status(status), ctx.data(body));
               })
         );
      } else if (isRestMethod(method)) {
         return new RestHandler(
            method,
            endpoint,
            customResolver ??
               ((req, res, ctx) => {
                  if (passthrough) return req.passthrough();

                  const transformers = [ctx.status(status)];

                  if (headers) {
                     transformers.push(ctx.set(headers));
                  }

                  // Only transform the body if it and the response type are defined
                  if (body && responseType) {
                     /**
                      * `raw` is for our own naming convention, but the actual
                      * transformer method is called `body`. This can be confusing
                      * so we are using our own naming convention to make it
                      * clearer what response type we will be using.
                      * @see https://mswjs.io/docs/api/context/body
                      */
                     transformers.push(
                        ctx[responseType === 'raw' ? 'body' : responseType](
                           body
                        )
                     );
                  }

                  if (once) return res.once(...transformers);

                  return res(...transformers);
               })
         );
      } else {
         throw new Error(
            `Invalid method ${method}. Must be 'mutation', 'query', 'all', 'get', 'post', 'put', 'patch', or 'delete'.`
         );
      }
   }
}

/**
 * This is a type guard to ensure that the `method` is a valid GraphQLMethod
 * by using Typescript Predicate Return Types.
 * @see https://www.typescriptlang.org/docs/handbook/2/classes.html#this-based-type-guards
 */
function isGraphQLMethod(method: string): method is GraphQLMethods {
   return method === 'mutation' || method === 'query';
}

/**
 * This is a type guard to ensure that the `method` is a valid RestMethod
 * by using Typescript Predicate Return Types.
 * @see https://www.typescriptlang.org/docs/handbook/2/classes.html#this-based-type-guards
 */
function isRestMethod(method: string): method is RestMethods {
   return (
      method === 'all' ||
      method === 'get' ||
      method === 'post' ||
      method === 'put' ||
      method === 'patch' ||
      method === 'delete'
   );
}
