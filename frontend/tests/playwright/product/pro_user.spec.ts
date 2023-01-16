import { interceptLogin } from '../utils';
import { test, expect } from '../test-fixtures';

test.describe('Pro user test', () => {
   test('Will give pro users a discount', async ({ page, productPage }) => {
      await productPage.gotoProduct('repair-business-toolkit');

      // Get price from page
      const originalPrice = await productPage.getCurrentPrice();

      // Login as pro and reload page
      await interceptLogin(page, {
         discount_tier: 'pro_4',
      });
      await page.reload();

      // Wait until the pro icon is shown.
      await page.waitForSelector('.fa-rectangle-pro');

      // Assert price on page is lower than step 1
      const proPrice = await productPage.getCurrentPrice();

      expect(proPrice).not.toEqual(originalPrice);
      expect(parseFloat(proPrice)).toBeLessThan(parseFloat(originalPrice));
   });
});
