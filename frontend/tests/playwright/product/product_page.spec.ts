import { test, expect } from '../test-fixtures';

test.describe('Product page test', () => {
   test('Verify product title, price and sku are visible', async ({
      productPage,
   }) => {
      await productPage.gotoProduct('repair-business-toolkit');

      // Assert product title is visible
      await expect(productPage.page.getByTestId('product-title')).toBeVisible();
      await expect(productPage.page.getByTestId('product-title')).toHaveText(
         'Repair Business Toolkit'
      );

      // Assert product sku is visible
      await expect(productPage.page.getByTestId('product-sku')).toBeVisible();
      /* eslint-disable no-useless-escape */
      await expect(productPage.page.getByTestId('product-sku')).toHaveText(
         /IF\d*\-\d*/g
      );

      // Get price from page
      await expect(
         productPage.page.getByTestId('current-price').first()
      ).toBeVisible();
      await expect(
         productPage.page.getByTestId('current-price').first()
      ).toHaveText(/\$\d*\.\d*/g);
   });
});
