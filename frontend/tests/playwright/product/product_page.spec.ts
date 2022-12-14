import { test, expect } from '@playwright/test';

test.describe('Product page test', () => {
   test('verify product title, price and sku are visible', async ({ page }) => {
      await page.goto('/products/repair-business-toolkit');

      // Assert product title is visible
      await expect(page.getByTestId('product-title')).toBeVisible();
      await expect(page.getByTestId('product-title')).toHaveText(
         'Repair Business Toolkit'
      );

      // Assert product sku is visible
      await expect(page.getByTestId('product-sku')).toBeVisible();
      await expect(page.getByTestId('product-sku')).toHaveText(/IF\d*\-\d*/g);

      // Get price from page
      await expect(page.getByTestId('product-price').first()).toBeVisible();
      await expect(page.getByTestId('product-price').first()).toHaveText(
         /\$\d*\.\d*/g
      );
   });
});
