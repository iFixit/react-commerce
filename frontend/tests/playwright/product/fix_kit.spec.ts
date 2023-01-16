import { test, expect } from '../test-fixtures';

test.describe('Fix Kit and Part Only test', () => {
   test.beforeEach(async ({ productPage }) => {
      await productPage.gotoProduct('iphone-6s-plus-replacement-battery');
   });

   test('Kit contents and product skus', async ({ page, productPage }) => {
      await expect(await productPage.getActiveVariant()).toHaveText('Fix Kit');
      await expect(page.getByText('Kit contents')).toBeVisible();
      await expect(page.getByText('Assembly contents')).not.toBeVisible();

      const fixKitSku = await productPage.getSku();

      await productPage.switchSelectedVariant();
      await expect(page.getByText('Assembly contents')).toBeVisible();
      await expect(page.getByText('Kit contents')).not.toBeVisible();

      const partOnlySku = await productPage.getSku();

      expect(fixKitSku).not.toEqual(partOnlySku);
   });

   test('Product image changes', async ({ page, productPage }) => {
      await expect(await productPage.getActiveVariant()).toHaveText('Fix Kit');
      await expect(page.getByRole('img', { name: 'Fix Kit' })).toBeVisible();
      await expect(
         page.getByRole('img', { name: 'Part Only' }).first()
      ).not.toBeVisible();

      await productPage.switchSelectedVariant();
      await expect(
         page.getByRole('img', { name: 'Part Only' }).first()
      ).toBeVisible();
      await expect(
         page.getByRole('img', { name: 'Fix Kit' })
      ).not.toBeVisible();
   });
});
