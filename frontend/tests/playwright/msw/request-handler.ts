import { RequestHandler } from 'msw';

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

export default class Handler {
   static create(request: RequestInfo): RequestHandler {
      const { endpoint, method } = request;

      if (isGraphQLMethod(method)) {
         // return GraphQLHandler
      } else if (isRestMethod(method)) {
         // return RestHandler
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
