import { test, expect } from '../test-fixtures';

test.describe('Product Variant Tests', () => {
   test('Product Variant Switch and Content Visibility', async ({
      productPage,
   }) => {
      await productPage.gotoProduct('iphone-6s-plus-replacement-battery');

      await expect(await productPage.getActiveVariant()).toContainText(
         'Fix Kit'
      );

      const productInfoSection = productPage.page.getByTestId(
         'product-info-section'
      );

      await expect(productInfoSection.getByText('Kit contents')).toBeVisible();
      await expect(
         productInfoSection.getByText('Assembly contents')
      ).not.toBeVisible();

      const fixKitSku = await productPage.getSku();

      await productPage.switchSelectedVariant();
      await expect(
         productInfoSection.getByText('Assembly contents')
      ).toBeVisible();
      await expect(
         productInfoSection.getByText('Kit contents')
      ).not.toBeVisible();

      const partOnlySku = await productPage.getSku();

      expect(fixKitSku).not.toEqual(partOnlySku);
   });

   test('Product Variant Image Visibility Toggle', async ({ productPage }) => {
      await productPage.gotoProduct('iphone-6s-plus-replacement-battery');
      await expect(await productPage.getActiveVariant()).toContainText(
         'Fix Kit'
      );
      await expect(
         productPage.page.getByRole('img', { name: 'Fix Kit' })
      ).toBeVisible();
      await expect(
         productPage.page.getByRole('img', { name: 'Part Only' }).first()
      ).not.toBeVisible();

      await productPage.switchSelectedVariant();
      await expect(
         productPage.page.getByRole('img', { name: 'Part Only' }).first()
      ).toBeVisible();
      await expect(
         productPage.page.getByRole('img', { name: 'Fix Kit' })
      ).not.toBeVisible();
   });

   test.skip('Switch Variants and Add To Cart', async ({
      productPage,
      cartDrawer,
   }) => {
      await productPage.gotoProduct('detailing-brush');
      const productInfoSection = productPage.page.getByTestId(
         'product-info-section'
      );

      await expect(productInfoSection.getByText('Style')).toBeVisible();

      // Get the price, sku, and name for the first product option
      const firstOptionPrice = await productPage.getCurrentPrice();
      const firstOptionSku = await productPage.getSku();
      const firstOptionName = await productPage.page
         .getByTestId('product-variants-selector')
         .locator('option')
         .nth(0)
         .textContent();

      // Add the first product option to the cart
      await productPage.addToCart();
      await cartDrawer.close();

      // Switch to the second product option
      await productPage.page
         .getByTestId('product-variants-selector')
         .selectOption({ index: 1 });
      expect(await productPage.getSku()).not.toContain(firstOptionSku);

      // Get the price, sku, and name for the second product option
      const secondOptionPrice = await productPage.getCurrentPrice();
      const secondOptionSku = await productPage.getSku();
      const secondOptionName = await productPage.page
         .getByTestId('product-variants-selector')
         .locator('option')
         .nth(1)
         .textContent();

      expect(firstOptionName).not.toEqual(secondOptionName);

      // Add the second product option to the cart
      await productPage.addToCart();

      // Assert that the cart drawer contains the skus of the added products
      await cartDrawer.assertItemIsPresent(firstOptionSku);
      await cartDrawer.assertItemIsPresent(secondOptionSku);

      // Assert that the cart drawer contains the prices of the added products
      expect(await cartDrawer.getItem(firstOptionSku)).toContainText(
         firstOptionPrice.toFixed(2)
      );
      expect(await cartDrawer.getItem(secondOptionSku)).toContainText(
         secondOptionPrice.toFixed(2)
      );
   });
});
