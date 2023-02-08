import { isRecord } from '@ifixit/helpers';
import { GraphQLHandler, RestHandler, RequestHandler } from 'msw';

/**
 * These methods are a subset of the GraphQL operational methods that are
 * supported by MSW's `graphql` handler. There are of course other methods
 * `MSW` supports, but we are only interested in these two for now.
 *
 * @see https://mswjs.io/docs/api/graphql#operation-kind
 */
export type GraphQLMethods = 'mutation' | 'query';

/**
 * These methods are a subset of the REST methods that are
 * supported by MSW's `rest` handler - _with the exception of
 * `options`_.
 *
 * @see https://mswjs.io/docs/api/rest#methods
 */
export type RestMethods = 'all' | 'get' | 'post' | 'put' | 'patch' | 'delete';

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
   body?: Record<string, any> | string | number | boolean | null;
   responseType?: 'json' | 'text' | 'xml' | 'raw';
};

export default class Handler {
   static create(
      request: RequestInfo,
      response: MockedResponseInfo
   ): RequestHandler {
      const { endpoint, method } = request;
      const { status, body, responseType } = response;

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
            (req, res, ctx) => {
               return res(ctx.status(status), ctx.data(body));
            }
         );
      } else if (isRestMethod(method)) {
         return new RestHandler(method, endpoint, (req, res, ctx) => {
            return res(
               ctx.status(status),
               /**
                * `raw` is for our own naming convention, but the actual
                * transformer method is called `body`. This can be confusing
                * so we are using our own naming convention to make it
                * clearer what response type we will be using.
                * @see https://mswjs.io/docs/api/context/body
                */
               ctx[responseType === 'raw' ? 'body' : responseType](body)
            );
         });
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
