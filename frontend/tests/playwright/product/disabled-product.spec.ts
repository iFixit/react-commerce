import { test, expect } from '../test-fixtures';

test.describe('Disabled Product Behavior', () => {
   test('Disabled Product Page Visibility and Meta Tags Validation', async ({
      productPage,
   }) => {
      await productPage.gotoProduct('hp-tt03xl-replacement-battery');
      await expect(
         productPage.page.getByTestId('not-for-sale-alert')
      ).toBeVisible();

      const productInfoSection = productPage.page.getByTestId(
         'product-info-section'
      );
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
      const metaRobots = productPage.page.locator('meta[name="robots"]');
      await expect(metaRobots).toHaveAttribute('content', 'noindex,nofollow');
   });
});
