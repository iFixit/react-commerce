import { test, expect } from '@playwright/test';

test.describe('Product image test', () => {
   test('product with a single image ', async ({ page }) => {
      await page.goto('/products/iflex-opening-tool');

      const image = page
         .getByRole('img', { name: 'iFlex Opening Tool' })
         .first();
      expect(image).toBeVisible;
   });
});
