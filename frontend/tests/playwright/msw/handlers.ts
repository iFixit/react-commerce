import { RequestHandler, graphql } from 'msw';
import { mockedProductQuery } from '@tests/jest/__mocks__/products';
import { cloneDeep } from 'lodash';

export const handlers: RequestHandler[] = [
   graphql.query('findProduct', async (req, res, ctx) => {
      if (
         req.variables.handle ===
         'iphone-6s-plus-replacement-battery-low-stocked'
      ) {
         const lowStockedProduct = cloneDeep(mockedProductQuery);
         if (lowStockedProduct.product) {
            lowStockedProduct.product.variants.nodes[0].quantityAvailable = 3;
         }
         return res(ctx.data(lowStockedProduct));
      } else if (
         req.variables.handle ===
         'iphone-6s-plus-replacement-battery-out-of-stock'
      ) {
         const outOfStockProduct = cloneDeep(mockedProductQuery);
         if (outOfStockProduct.product) {
            outOfStockProduct.product.variants.nodes[0].quantityAvailable = 0;
         }
         return res(ctx.data(outOfStockProduct));
      } else if (
         req.variables.handle === 'iphone-6s-plus-replacement-battery-disabled'
      ) {
         const disabledProduct = cloneDeep(mockedProductQuery);
         if (disabledProduct.product) {
            disabledProduct.product.variants.nodes.forEach((variant) => {
               variant.enabled = null;
            });
         }
         return res(ctx.data(disabledProduct));
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
