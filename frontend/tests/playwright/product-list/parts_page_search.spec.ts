import { test, expect } from '../test-fixtures';

test.describe('parts page search', () => {
   test.beforeEach(async ({ page }) => {
      await page.goto('/Parts');
   });

   test('Should show results when the search term exists', async ({ page }) => {
      expect(page.getByTestId('collections-search-box')).toBeVisible();
      expect(page.getByTestId('collections-search-box')).not.toBeDisabled();

      await page.getByTestId('collections-search-box').fill('iphone');
      // Wait for url to update after search
      await page.waitForURL('**/Parts?q=*');

      // Check that url parameter contains ?q after searching
      expect(page.url()).toContain('?q=iphone');

      // Assert that all products in the result contains word watch
      const products = page
         .getByTestId('list-view-products')
         .getByRole('article');
      const productCount = await products.count();

      for (let i = 0; i < productCount; i++) {
         const product = products.nth(i);
         expect(await product.textContent()).toContain('iphone');
      }
   });

   test("Should show no results when search term doesn't exist", async ({
      page,
   }) => {
      expect(page.getByTestId('collections-search-box')).toBeVisible();
      expect(page.getByTestId('collections-search-box')).not.toBeDisabled();

      await page.getByTestId('collections-search-box').fill('asdasasdadasd');
      // Wait for url to update after search
      await page.waitForURL('**/Parts?q=*');

      // Check that url parameter contains ?q after searching
      expect(page.url()).toContain('?q=');

      await expect(page.getByTestId('list-view-products')).not.toBeVisible();
      await expect(page.getByTestId('product-list-no-results')).toBeVisible();
   });
});
