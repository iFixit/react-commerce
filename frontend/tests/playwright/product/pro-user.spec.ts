import { interceptLogin } from '../utils';
import { test, expect } from '../test-fixtures';

test.describe('Pro User Test', () => {
   test('Pro Discount Applied to Product Price', async ({ productPage }) => {
      await productPage.gotoProduct('ipad-2-screw-set');

      // Get price from page
      const originalPrice = await productPage.getCurrentPrice();

      // Login as pro and reload page
      await interceptLogin(productPage.page, {
         discount_tier: 'pro_4',
      });
      await productPage.page.reload();

      // Wait until the pro icon is shown.
      await productPage.page.waitForSelector('.fa-rectangle-pro');

      // Assert price on page is lower than step 1
      const proPrice = await productPage.getCurrentPrice();

      expect(proPrice).toBeLessThan(originalPrice);
   });
});
