import { RequestHandler, graphql } from 'msw';
import { mockedProductQuery } from '@tests/jest/__mocks__/products';

export const handlers: RequestHandler[] = [
   graphql.query('findProduct', async (req, res, ctx) => {
      if (req.variables.handle === 'caig-electronic-cleaner') {
         return res(ctx.data(mockedProductQuery));
      } else {
         // Perform an original request to the intercepted request URL
         const originalResponse = await ctx.fetch(req);
         const originalResponseData = await originalResponse.json();

         /*
          * A `data` property will be added to the original response so in order
          * to properly return the correct response structure we need to remove
          * the `data` property so we don't end up with a nested `data` property.
          */
         // Return the original response product
         return res(ctx.data(originalResponseData.data));
      }
   }),
];
