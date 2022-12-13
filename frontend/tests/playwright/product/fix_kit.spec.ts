import { test, expect } from '@playwright/test';

test.describe('Fix Kit and Part Only test', () => {
   test.beforeEach(async ({ page }) => {
      await page.goto('/products/iphone-6s-plus-replacement-battery');
   });

   test('test kit contents and product skus', async ({ page }) => {
      await page.getByText('Fix Kit').nth(1).click();
      await expect(page.getByText('Kit contents')).toBeVisible();
      await expect(page.getByText('Assembly contents')).not.toBeVisible();

      await expect(page.getByTestId('product-sku')).toBeVisible();
      const fixKitSku = await page.getByTestId('product-sku').textContent();

      await page.getByText('Part Only').nth(0).click();
      await expect(page.getByText('Assembly contents')).toBeVisible();
      await expect(page.getByText('Kit contents')).not.toBeVisible();

      await expect(page.getByTestId('product-sku')).toBeVisible();
      const partOnlySku = await page.getByTestId('product-sku').textContent();

      expect(fixKitSku).not.toEqual(partOnlySku);
   });

   test('test product image changes', async ({ page }) => {
      await page.getByText('Fix Kit').nth(1).click();

      await expect(page.getByRole('img', { name: 'Fix Kit' })).toBeVisible();
      await expect(
         page.getByRole('img', { name: 'Part Only' }).first()
      ).not.toBeVisible();

      await page.getByText('Part Only').nth(0).click();
      await expect(
         page.getByRole('img', { name: 'Part Only' }).first()
      ).toBeVisible();
      await expect(
         page.getByRole('img', { name: 'Fix Kit' })
      ).not.toBeVisible();
   });
});
