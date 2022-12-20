import { test, expect } from '@playwright/test';

test.describe('parts page devices', () => {
   test.beforeEach(async ({ page }) => {
      await page.goto('/Parts');
   });

   test('Should navigate until the last device page', async ({ page }) => {
      await expect(
         page.getByTestId('filterable-products-section')
      ).toBeVisible();
      await page.getByTestId('facets-accordion').scrollIntoViewIfNeeded();
      await expect(page.getByTestId('facets-accordion')).toBeVisible();

      // Makes sure there is at least 1 product available
      expect(
         await page.getByTestId('list-view-products').count()
      ).toBeGreaterThanOrEqual(1);

      const navigateUntilLastDevice = async () => {
         if ((await page.getByTestId('product-list-children').count()) <= 0)
            return false;

         const childLink = page
            .getByTestId('product-list-children')
            .getByRole('link')
            .first();
         const childHref = await childLink.getAttribute('href');
         const childTitle = await childLink.textContent();
         const childTitleRegexp = new RegExp(`^${childTitle}$`, 'i');

         let currentURL = new URL(page.url());
         expect(currentURL.pathname).not.toEqual(childHref);

         // Start waiting for navigation before clicking
         const navigationPromise = page.waitForNavigation();
         await childLink.click();
         await navigationPromise;

         currentURL = new URL(page.url());

         expect(currentURL.pathname).toEqual(childHref);
         await expect(
            page.getByRole('heading', { level: 1, name: childTitleRegexp })
         ).toBeVisible();

         await navigateUntilLastDevice();
      };

      await navigateUntilLastDevice();
   });
});
