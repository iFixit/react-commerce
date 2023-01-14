import { test, expect } from '../test-fixtures';

test.describe('Product image test', () => {
   test('product with a single image ', async ({ page, productPage }) => {
      await productPage.gotoProduct('iflex-opening-tool');

      const image = page
         .getByRole('img', { name: 'iFlex Opening Tool' })
         .first();
      expect(image).toBeVisible;
   });

   test('product with multiple images ', async ({ page, productPage }) => {
      await productPage.gotoProduct('repair-business-toolkit');
      const viewPort = page.viewportSize();

      const firstImageSrc = await page
         .locator('.swiper-slide.swiper-slide-active')
         .getByRole('img')
         .first()
         .getAttribute('src');

      const firstImage =
         viewPort!.width > 768
            ? page
                 .getByTestId('product-gallery-desktop')
                 .locator(`img[src="${firstImageSrc}"]`)
                 .first()
            : page
                 .getByTestId('product-gallery-mobile')
                 .locator(`img[src="${firstImageSrc}"]`)
                 .first();

      await expect(firstImage).toBeVisible();

      // Click on the arrow for the next image
      if (viewPort!.width > 768) {
         await page
            .getByTestId('product-gallery-desktop')
            .getByTestId('swiper-next-image')
            .click();
      } else {
         await page
            .getByTestId('product-gallery-mobile')
            .getByTestId('swiper-next-image')
            .click();
      }

      const secondImageSrc = await page
         .locator('.swiper-slide.swiper-slide-active')
         .getByRole('img')
         .first()
         .getAttribute('src');
      const secondImage = page.locator(`img[src="${secondImageSrc}"]`).first();
      await expect(secondImage).toBeVisible();

      // Assert that currently active image has different src than the first one
      expect(firstImageSrc).not.toEqual(secondImageSrc);
   });
});
