import { test, expect } from '@playwright/test';

test.describe.serial('product page add to cart', () => {
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

   test.describe('Product Stock Levels', () => {
      test('Low stocked product changes quantity', async ({ page }) => {
         await page.goto(
            '/products/iphone-6s-plus-replacement-battery-low-stocked'
         );

         const firstOptionSku = await page
            .getByTestId('product-sku')
            .textContent();
         const sku1 = firstOptionSku?.replace('Item # ', '') ?? '';
         expect(sku1).not.toEqual('');

         await expect(
            page.getByTestId('product-inventory-message')
         ).toBeVisible();
         await expect(page.getByTestId('product-inventory-message')).toHaveText(
            'Only 3 left'
         );
         await page.getByTestId('product-add-to-cart-button').click();
         await expect(page.getByTestId('cart-drawer-quantity')).toHaveText('1');

         await page.getByTestId('cart-drawer-close').click();
         await expect(page.getByTestId('product-inventory-message')).toHaveText(
            'Only 2 left'
         );

         await page.getByTestId('cart-drawer-open').click();
         await page.getByTestId('cart-drawer-increase-quantity').click();
         await expect(page.getByTestId('cart-drawer-quantity')).toHaveText('2');

         await page.getByTestId('cart-drawer-close').click();
         await expect(page.getByTestId('product-inventory-message')).toHaveText(
            'Only 1 left'
         );

         await page.getByTestId('cart-drawer-open').click();
         await page.getByTestId('cart-drawer-increase-quantity').click();
         await expect(page.getByTestId('cart-drawer-quantity')).toHaveText('3');

         await page.getByTestId('cart-drawer-close').click();
         await expect(page.getByTestId('product-inventory-message')).toHaveText(
            'No more items available'
         );
         await expect(
            page.getByTestId('product-add-to-cart-button')
         ).toBeDisabled();

         await page.getByText('Part Only').first().click();
         const secondOptionSku = await page
            .getByTestId('product-sku')
            .textContent();
         const sku2 = secondOptionSku?.replace('Item # ', '') ?? '';
         expect(sku2).not.toEqual('');
         await expect(
            page.getByTestId('product-add-to-cart-button')
         ).toBeVisible();
         await expect(
            page.getByTestId('product-inventory-message')
         ).not.toBeVisible();
         await page.getByTestId('product-add-to-cart-button').click();

         await expect(
            page
               .getByRole('listitem')
               .filter({ hasText: sku2 })
               .getByTestId('cart-drawer-quantity')
         ).toHaveText('1');
         await expect(
            page
               .getByRole('listitem')
               .filter({ hasText: sku1 })
               .getByTestId('cart-drawer-quantity')
         ).toHaveText('3');

         await page
            .getByRole('listitem')
            .filter({ hasText: sku1 })
            .getByTestId('cart-drawer-decrease-quantity')
            .click();
         await expect(
            page
               .getByRole('listitem')
               .filter({ hasText: sku1 })
               .getByTestId('cart-drawer-quantity')
         ).toHaveText('2');

         await page.getByTestId('cart-drawer-close').click();
         await page.getByText('Fix Kit').nth(1).click();
         await expect(page.getByTestId('product-inventory-message')).toHaveText(
            'Only 1 left'
         );
      });

      test('Out of stock product cannot be added to cart', async ({ page }) => {
         await page.goto(
            '/products/iphone-6s-plus-replacement-battery-out-of-stock'
         );
         await expect(
            page.getByRole('img', { name: 'Fix Kit' })
         ).not.toBeVisible();
         await expect(
            page.getByRole('img', { name: 'Part Only' }).first()
         ).toBeVisible();

         await page.getByText('Fix Kit').nth(1).click();

         await expect(
            page.getByTestId('product-add-to-cart-button')
         ).not.toBeVisible();
         await expect(
            page.getByTestId('product-inventory-message')
         ).not.toBeVisible();

         const notifyMeForm = page.getByText(/this item is currently/i);
         await expect(notifyMeForm).toBeVisible();
         await expect(notifyMeForm).toHaveText(
            'This item is currently Out of Stock'
         );

         await page.getByLabel('Email address').fill('test@example.com');
         await page.getByRole('button', { name: 'Notify me' }).click();
         await expect(
            page.getByText(
               'You will be notified when this product is back in stock.'
            )
         ).toBeVisible();

         await page.getByText('Part Only').first().click();
         await expect(
            page.getByTestId('product-add-to-cart-button')
         ).toBeVisible();
         await expect(
            page.getByTestId('product-inventory-message')
         ).not.toBeVisible();

         const partOnlySku = await page
            .getByTestId('product-sku')
            .textContent();
         const sku = partOnlySku?.replace('Item # ', '') ?? '';
         expect(sku).not.toEqual('');

         await page.getByTestId('product-add-to-cart-button').click();
         await expect(page.getByTestId('cart-drawer-quantity')).toHaveText('1');
         await expect(
            page.getByTestId('cart-drawer-body').getByText(sku)
         ).toBeVisible();

         await page.getByTestId('cart-drawer-close').click();
         await expect(
            page.getByTestId('product-add-to-cart-button')
         ).toBeEnabled();
         await expect(
            page.getByTestId('product-inventory-message')
         ).not.toBeVisible();
      });
   });
});
