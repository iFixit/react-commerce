import { test, expect } from '../test-fixtures';
import { mockedProductQuery } from '@tests/jest/__mocks__/products';
import { cloneDeep } from 'lodash';
import Handler from '../msw/request-handler';

test.describe('Disabled Product Test', () => {
   test('Not for Sale text renders and noindexed', async ({
      productPage,
      serverRequestInterceptor,
      port,
   }) => {
      const disabledProduct = cloneDeep(mockedProductQuery);
      if (disabledProduct.product) {
         disabledProduct.product.variants.nodes.forEach((variant) => {
            variant.enabled = null;
         });
      }

      serverRequestInterceptor.use(
         Handler.create({
            request: {
               endpoint: 'findProduct',
               method: 'query',
            },
            response: {
               status: 200,
               body: disabledProduct,
            },
         })
      );

      await productPage.page.goto(
         `http://localhost:${port}/products/iphone-6s-plus-replacement-battery-disabled`
      );

      await expect(productPage.page.getByText('Not for Sale')).toBeVisible();
      await expect(productPage.page.getByText('Description')).toBeVisible();
      await expect(
         productPage.page.getByRole('link', { name: 'One year warranty' })
      ).toHaveAttribute('href', 'https://www.cominor.com/Info/Warranty');

      // Assert the following to be not visible
      await expect(productPage.page.getByText('Add to Cart')).not.toBeVisible();
      await expect(
         productPage.page.getByText(/Only \d left/i)
      ).not.toBeVisible();
      await expect(productPage.page.getByText('Notify me')).not.toBeVisible();
      await expect(
         productPage.page.getByText('Shipping restrictions apply')
      ).not.toBeVisible();
      await expect(
         productPage.page.getByTestId('product-variants-selector')
      ).not.toBeVisible();
      await expect(
         productPage.page.getByText(/Buy from our Store in/i)
      ).not.toBeVisible();
      await expect(
         productPage.page.getByText(/Buy from our US Store/i)
      ).not.toBeVisible();

      // Assert that we noindex disabled product pages
      const metaRobots = productPage.page.locator('meta[name="robots"]');
      await expect(metaRobots).toHaveAttribute('content', 'noindex,nofollow');
   });
});
