import { test, expect } from '../test-fixtures';
import { mockedProductQuery } from '@tests/jest/__mocks__/products';
import { cloneDeep } from 'lodash';

test.describe('Disabled Product Test', () => {
   test('Not for Sale text renders and noindexed', async ({
      page,
      serverRequestInterceptor,
      port,
      graphql,
   }) => {
      serverRequestInterceptor.use(
         graphql.query('findProduct', async (req, res, ctx) => {
            const disabledProduct = cloneDeep(mockedProductQuery);
            if (disabledProduct.product) {
               disabledProduct.product.variants.nodes.forEach((variant) => {
                  variant.enabled = null;
               });
            }
            return res(ctx.data(disabledProduct));
         })
      );

      await page.goto(
         `http://localhost:${port}/products/iphone-6s-plus-replacement-battery-disabled`
      );

      await expect(page.getByTestId('not-for-sale-alert')).toBeVisible();

      const productInfoSection = page.getByTestId('product-info-section');
      await expect(productInfoSection.getByText('Description')).toBeVisible();
      await expect(
         productInfoSection.getByRole('link', { name: 'One year warranty' })
      ).toHaveAttribute('href', 'https://www.cominor.com/Info/Warranty');

      // Assert the following to be not visible
      await expect(
         productInfoSection.getByTestId('product-add-to-cart-button')
      ).not.toBeVisible();
      await expect(
         productInfoSection.getByTestId('product-inventory-message')
      ).not.toBeVisible();
      await expect(
         productInfoSection.getByTestId('notify-me-form')
      ).not.toBeVisible();
      await expect(
         productInfoSection.getByText('Shipping restrictions apply')
      ).not.toBeVisible();
      await expect(
         productInfoSection.getByTestId('product-variants-selector')
      ).not.toBeVisible();
      await expect(
         productInfoSection.getByTestId('international-buy-box')
      ).not.toBeVisible();

      // Assert that we noindex disabled product pages
      const metaRobots = page.locator('meta[name="robots"]');
      await expect(metaRobots).toHaveAttribute('content', 'noindex,nofollow');
   });
});
