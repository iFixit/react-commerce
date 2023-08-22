import { test, expect } from '../test-fixtures';

test.describe('Product Page Cross-Sell', () => {
   test('should add item to cart', async ({ productPage, page }) => {
      await productPage.gotoProduct('iphone-6s-plus-replacement-battery');

      const productCrossSell = page.getByTestId('product-cross-sell');
      const items = productCrossSell.getByTestId('product-cross-sell-item');
      const firstItem = items.first();

      await firstItem.getByRole('button', { name: 'add to cart' }).click();

      const firstItemTitle = await firstItem
         .getByTestId('product-cross-sell-item-title')
         .textContent();

      const cartDrawerText = await page
         .getByTestId('cart-drawer-line-items')
         .textContent();

      expect(cartDrawerText).toContain(firstItemTitle);
   });
});
