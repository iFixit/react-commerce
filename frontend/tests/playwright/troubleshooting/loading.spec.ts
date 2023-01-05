import { test, expect } from '@playwright/test';

test.describe('Vulcan page', () => {
   test('it loads', async ({ page }) => {
      await page.goto('/Vulcan/iPhone');
      await expect(page.getByText('iPhone')).toBeVisible();
   });
});
