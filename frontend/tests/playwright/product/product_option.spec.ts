import { test, expect } from '@playwright/test';

test.describe('Product option test', () => {
   test('Different styles', async ({ page }) => {
      await page.goto('/products/repair-business-toolkit');

      await expect(page.getByText('Style')).toBeVisible();

      // Get the price, sku, and name for the first product option
      const firstOptionPrice = await page
         .getByTestId('product-price')
         .first()
         .innerText();
      const firstOptionSku = await page
         .getByTestId('product-sku')
         .textContent();
      const firstOptionName = await page
         .getByTestId('product-option-selector')
         .locator('option')
         .nth(0)
         .textContent();

      // Add the first product option to the cart
      await page.getByTestId('product-add-to-cart-button').click();
      await page.getByTestId('cart-drawer-close').click();

      // Switch to the second product option
      await page
         .getByTestId('product-option-selector')
         .selectOption({ index: 1 });
      expect(page.getByTestId('product-sku')).not.toContain(firstOptionSku);

      // Get the price, sku, and name for the second product option
      const secondOptionPrice = await page
         .getByTestId('product-price')
         .first()
         .innerText();
      const secondOptionSku = await page
         .getByTestId('product-sku')
         .textContent();
      const secondOptionName = await page
         .getByTestId('product-option-selector')
         .locator('option')
         .nth(1)
         .textContent();

      expect(firstOptionName).not.toEqual(secondOptionName);

      // Add the second product option to the cart
      await page.getByTestId('product-add-to-cart-button').click();

      // Assert that the cart drawer contains the skus and prices of the added products
      await expect(page.getByTestId('cart-drawer-body')).toBeVisible();

      // Parse out the skus from the skuTexts which are in form of "Item # IF145-278-14"
      const sku1 = firstOptionSku?.replace('Item # ', '') ?? '';
      const sku2 = secondOptionSku?.replace('Item # ', '') ?? '';
      expect(sku1).not.toEqual('');
      expect(sku2).not.toEqual('');

      // Assert that the cart drawer contains the skus of the added products
      await expect(
         page.getByTestId('cart-drawer-body').getByText(sku1)
      ).toBeVisible();
      await expect(
         page.getByTestId('cart-drawer-body').getByText(sku2)
      ).toBeVisible();

      // Assert that the cart drawer contains the prices of the added products
      await expect(
         page.getByTestId('cart-drawer-body').getByText(firstOptionPrice)
      ).toBeVisible();
      await expect(
         page.getByTestId('cart-drawer-body').getByText(secondOptionPrice)
      ).toBeVisible();
   });
});
