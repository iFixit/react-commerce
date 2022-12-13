import { test, expect } from '@playwright/test';

test.describe('product page add to cart', () => {
   test.beforeEach(async ({ page }) => {
      await page.route(
         '/api/2.0/internal/international_store_promotion/buybox*',
         (route) => {
            route.fulfill({
               status: 200,
               body: '',
            });
         }
      );
      await page.goto('/products/spudger-retail-3-pack');
   });

   test('Clicking Add To Cart Adds Items To Cart', async ({ page }) => {
      for (let i = 1; i <= 5; i++) {
         await page.getByTestId('product-add-to-cart-button').click();
         const quantity = page.getByTestId('cart-drawer-quantity');
         await expect(quantity).toHaveText(`${i}`);
         await page.getByTestId('cart-drawer-close').click();
      }

      await page.getByTestId('cart-drawer-open').click();
      await expect(page.getByTestId('cart-drawer-quantity')).toHaveText('5');
   });

   test('Clicking + and - Buttons Changes Item Quantity in Cart', async ({
      page,
   }) => {
      await page.getByTestId('product-add-to-cart-button').click();
      await expect(page.getByTestId('cart-drawer-item-count')).toHaveText('1');

      for (let i = 2; i <= 5; i++) {
         await page.getByTestId('cart-drawer-increase-quantity').click();
         const quantity = await page
            .getByTestId('cart-drawer-quantity')
            .textContent();
         expect(quantity).toBe(`${i}`);
      }

      await page.getByTestId('cart-drawer-close').click();
      await page.getByTestId('cart-drawer-open').click();

      for (let i = 5; i > 1; i--) {
         await page.getByTestId('cart-drawer-decrease-quantity').click();
         const quantity = await page
            .getByTestId('cart-drawer-quantity')
            .textContent();
         expect(quantity).toBe(`${i - 1}`);
      }

      await expect(page.getByTestId('cart-drawer-item-count')).toHaveText('1');
      await expect(page.getByTestId('cart-drawer-quantity')).toHaveText('1');
   });

   test('Item Can Be Added Again After Removing The Item', async ({ page }) => {
      await page.getByTestId('product-add-to-cart-button').click();
      await expect(page.getByTestId('cart-drawer-item-count')).toHaveText('1');
      await page.getByTestId('cart-drawer-remove-item').click();
      await expect(page.getByTestId('cart-drawer-item-count')).toHaveText('0');
      await expect(page.getByTestId('cart-drawer-quantity')).not.toBeVisible();
      await page.getByTestId('cart-drawer-close').click();
      await page.getByTestId('product-add-to-cart-button').click();
      await expect(page.getByTestId('cart-drawer-item-count')).toHaveText('1');
   });

   test('Back to Shopping Button Works', async ({ page }) => {
      await page.getByTestId('cart-drawer-open').click();
      await expect(page.getByTestId('cart-drawer-item-count')).toHaveText('0');
      await expect(page.getByTestId('cart-drawer-quantity')).not.toBeVisible();
      await page.getByTestId('back-to-shopping').click();
      await expect(
         page.getByTestId('cart-drawer-item-count')
      ).not.toBeVisible();

      await page.getByTestId('product-add-to-cart-button').click();
      await expect(page.getByTestId('cart-drawer-item-count')).toHaveText('1');
      await expect(page.getByTestId('back-to-shopping')).not.toBeVisible();
      await page.getByTestId('cart-drawer-remove-item').click();
      await expect(page.getByTestId('cart-drawer-item-count')).toHaveText('0');
      await expect(page.getByTestId('cart-drawer-quantity')).not.toBeVisible();
      await page.getByTestId('back-to-shopping').click();
      await expect(
         page.getByTestId('cart-drawer-item-count')
      ).not.toBeVisible();
      await expect(page.getByTestId('cart-drawer-close')).not.toBeVisible();
   });
});
