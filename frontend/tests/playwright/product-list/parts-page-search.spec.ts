import { test, expect } from '../test-fixtures';

test.describe('Parts Page Search', () => {
   test.beforeEach(async ({ page }) => {
      await page.goto('/Parts');
   });

   test('Display Results for Existing Search Term', async ({ page }) => {
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

   test('Display No Results for Nonexisting Search Term', async ({ page }) => {
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

   test('URL Updates When Search Query is Empty', async ({ page }) => {
      expect(page.getByTestId('collections-search-box')).toBeVisible();
      expect(page.getByTestId('collections-search-box')).not.toBeDisabled();

      const searchText = 'vive';
      await page.getByTestId('collections-search-box').fill(searchText);
      // Wait for url to update after search
      await page.waitForURL(`**/Parts?q=${searchText}`);
      expect(page.url()).toContain(`?q=${searchText}`);

      // Empty the search-box
      const inputField = await page.getByTestId('collections-search-box');
      await inputField.selectText();
      await inputField.press('Backspace');

      // Check that url doesn't have the query parameter containing ?q
      await page.waitForURL('**/Parts');
      expect(page.url()).not.toContain('?q=');
      expect(page.url()).not.toContain(`?q=${searchText}`);
   });
});
