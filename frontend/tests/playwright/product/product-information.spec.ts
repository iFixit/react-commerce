import { expect, test } from '../test-fixtures';

test.describe('Product Information Visibility', () => {
   test('Title, Price, and SKU', async ({ productPage }) => {
      await productPage.gotoProduct('repair-business-toolkit');

      // Assert product title is visible
      await expect(productPage.page.getByTestId('product-title')).toBeVisible();
      await expect(productPage.page.getByTestId('product-title')).toContainText(
         'Repair Business Toolkit'
      );

      // Assert product sku is visible
      await expect(productPage.page.getByTestId('product-sku')).toBeVisible();
      /* eslint-disable no-useless-escape */
      await expect(productPage.page.getByTestId('product-sku')).toContainText(
         /IF\d*\-\d*/g
      );

      // Get price from page
      const productPrice = productPage.page.getByTestId(
         'product-price-section'
      );
      const price = productPrice.getByTestId('price');
      await expect(price).toBeVisible();
      await expect(price).toContainText(/\$\d*\.\d*/g);
   });
});
