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
} from 'msw';

/**
 * These methods are a subset of the GraphQL operational methods that are
 * supported by MSW's `graphql` handler. There are of course other methods
 * `MSW` supports, but we are only interested in these two for now.
 *
 * @see https://mswjs.io/docs/api/graphql#operation-kind
 */
export type GraphQLMethods = 'mutation' | 'query';
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
export type RestMethods = 'all' | 'get' | 'post' | 'put' | 'patch' | 'delete';
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

export type RequestInfo = {
   endpoint: string;
   method: GraphQLMethods | RestMethods;
};

/**
 * This type represents the options that can be passed to the handler
 * to configure what the response should return if the request is matched.
 *
 * @property `status` - The HTTP status code to return
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
export type MockedResponseInfo = {
   status: number;
   headers?: Record<string, string | string[]>;
   body?: Record<string, any> | string | number | boolean | null;
   responseType?: 'json' | 'text' | 'xml' | 'raw';
};

/**
 * These are some options that can be passed to configure the request handler.
 * @property `once` - If true, the handler will only be used once.
 * @see https://mswjs.io/docs/api/response/once
 * @property `passthrough` - If true, the request will be bypassed and performed
 * as-is.
 * @see https://mswjs.io/docs/api/request/passthrough
 */
export type HandlerOptions = {
   once: boolean;
   passthrough: boolean;
   customResolver?: GraphQLResolver | RestResolver;
};

export default class Handler {
   static create(
      request: RequestInfo,
      response: MockedResponseInfo,
      options: HandlerOptions = { once: false, passthrough: false }
   ): RequestHandler {
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
