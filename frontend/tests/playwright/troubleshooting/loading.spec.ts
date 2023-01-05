import { test, expect } from '@playwright/test';

test.describe('Vulcan page', () => {
   test('it loads', async ({ page }) => {
      await page.goto('/Vulcan/iPhone');
      await expect(page.getByText('iPhone')).toBeVisible();
   });

   test('it should not be indexed', async ({ page }) => {
      await page.goto('/Vulcan/iPhone');
      // check that the meta robots tag is set to noindex
      expect(
         page.locator('meta[name="robots"][content="noindex"]')
      ).toBeTruthy();
   });
});
