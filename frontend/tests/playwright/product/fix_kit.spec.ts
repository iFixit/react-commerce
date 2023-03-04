import { test, expect } from '../test-fixtures';

test.describe('Fix Kit and Part Only test', () => {
   test('Kit contents and product skus', async ({ productPage }) => {
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

   test('Product image changes', async ({ productPage }) => {
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
});
