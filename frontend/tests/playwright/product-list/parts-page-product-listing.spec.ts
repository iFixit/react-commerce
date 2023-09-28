import { test, expect } from '../test-fixtures';

test.describe('Parts Page Product Listing', () => {
   test.beforeEach(async ({ page }) => {
      await page.goto('/Parts');
   });

   test('Each Product Displays Visible Price', async ({ page }) => {
      const products = page
         .getByTestId('list-view-products')
         .getByRole('article');
      const productCount = await products.count();

      for (let i = 0; i < productCount; i++) {
         const product = products.nth(i);
         await expect(product.getByTestId('price')).toBeVisible();
      }
   });

   test('Product View Button Navigates to Product Page', async ({ page }) => {
      const productViewButton = page
         .getByRole('link', { name: 'View' })
         .first();
      const productViewButtonHref = await productViewButton.getAttribute(
         'href'
      );

      const navigationPromise = page.waitForNavigation();
      await productViewButton.click();
      await navigationPromise;

      // Assert the current window url path is the same as button link
      const url = new URL(page.url());
      expect(url.pathname).toEqual(productViewButtonHref);
   });
});
