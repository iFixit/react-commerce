import { test, expect } from '../test-fixtures';

test.describe('Collections Display Modes', () => {
   test.beforeEach(async ({ page }) => {
      await page.goto('/Tools');
   });

   test('Display Grid View on Selection', async ({ page }) => {
      await page.getByTestId('grid-view-button').click();
      await expect(page.getByTestId('list-view-products')).not.toBeVisible();

      // Make sure the display property equals to grid
      const grid = page.getByTestId('grid-view-products');
      await expect(grid).toHaveCSS('display', 'grid');
   });

   test('Display List View on Selection', async ({ page }) => {
      // First click on grid view button
      await page.getByTestId('grid-view-button').click();
      // Then switch back to list view button
      await page.getByTestId('list-view-button').click();
      await expect(page.getByTestId('grid-view-products')).not.toBeVisible();

      // Make sure the display property equals to flex
      const list = page.getByTestId('list-view-products');
      await expect(list).toHaveCSS('display', 'flex');
   });
});
