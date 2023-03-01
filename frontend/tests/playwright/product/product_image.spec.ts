import { test, expect } from '../test-fixtures';

test.describe('Product image test', () => {
   test('product with a single image ', async ({ productPage }) => {
      await productPage.gotoProduct('iflex-opening-tool');

      const image = productPage.page
         .getByRole('img', { name: 'iFlex Opening Tool' })
         .first();
      expect(image).toBeVisible;
   });

   test('product with multiple images ', async ({ productPage }) => {
      await productPage.gotoProduct('repair-business-toolkit');
      const viewPort = productPage.page.viewportSize();

      const firstImageSrc = await productPage.page
         .locator('.swiper-slide.swiper-slide-active')
         .getByRole('img')
         .first()
         .getAttribute('src');

      const firstImage =
         viewPort!.width > 768
            ? productPage.page
                 .getByTestId('product-gallery-desktop')
                 .locator(`img[src="${firstImageSrc}"]`)
                 .first()
            : productPage.page
                 .getByTestId('product-gallery-mobile')
                 .locator(`img[src="${firstImageSrc}"]`)
                 .first();

      await expect(firstImage).toBeVisible();

      // Click on the arrow for the next image
      if (viewPort!.width > 768) {
         await productPage.page
            .getByTestId('product-gallery-desktop')
            .getByTestId('swiper-next-image')
            .click();
      } else {
         await productPage.page
            .getByTestId('product-gallery-mobile')
            .getByTestId('swiper-next-image')
            .click();
      }

      const secondImageSrc = await productPage.page
         .locator('.swiper-slide.swiper-slide-active')
         .getByRole('img')
         .first()
         .getAttribute('src');
      const secondImage = productPage.page
         .locator(`img[src="${secondImageSrc}"]`)
         .first();
      await expect(secondImage).toBeVisible();

      // Assert that currently active image has different src than the first one
      expect(firstImageSrc).not.toEqual(secondImageSrc);
   });
});
