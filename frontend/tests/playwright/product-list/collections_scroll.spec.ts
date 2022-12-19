import { test, expect } from '@playwright/test';
// Assert that when a user clicks the pagination buttons,
// the page scrolls back up.

test.describe('collections scroll', () => {
   test.beforeEach(async ({ page }) => {
      await page.goto('/Tools');
   });

   test('Should scroll to the top of the page after clicking next page', async ({
      page,
   }) => {
      await (
         expect(page.getByTestId('collections-search-box')) as any
      ).toBeVisible();

      await page.getByTestId('next-page').click();

      // Wait for the page to scroll to the top
      await page.waitForLoadState('networkidle');

      // When it scrolls to the top, the search bar should be visible
      await (
         expect(page.getByTestId('collections-search-box')) as any
      ).toBeWithinViewport(page.viewportSize());

      // Check that url parameter contains ?p after clicking next page
      await (expect(page.url()) as any).toContain('?p=');
   });
});
