import { RequestHandler, rest } from 'msw';

/**
 * @see https://mswjs.io/docs/basics/request-handler for
 * more information on how to create request handlers for
 * rest and graphql requests.
 */
export const handlers: RequestHandler[] = [
   /**
    * Prepending the wildcard to the path would capture requests regardless of
    * origin. Therefore, API requests to Cominor will also be matched against.
    */
   rest.get(
      '*/api/2.0/internal/international_store_promotion/buybox',
      (req, res, ctx) => {
         return res(ctx.status(200));
      }
   ),
];
