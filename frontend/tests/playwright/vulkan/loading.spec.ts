import { test, expect } from '@playwright/test';

test.describe('Vulkan page', () => {

   test('it loads', async ({ page }) => {
      await page.goto('/Vulkan/iPhone')
      await expect(page.getByText('iPhone')).toBeVisible();
   });
});
