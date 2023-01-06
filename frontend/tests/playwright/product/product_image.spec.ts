import { test, expect } from '@playwright/test';

test.describe('Product image test', () => {
   test('product with a single image ', async ({ page }) => {
      await page.goto('/products/iflex-opening-tool');

      const image = page
         .getByRole('img', { name: 'iFlex Opening Tool' })
         .first();
      expect(image).toBeVisible;
   });

   test('product with multiple images ', async ({ page }) => {
      await page.goto('/products/repair-business-toolkit');

      const firstImageSrc = await page
         .locator('.swiper-slide.swiper-slide-active')
         .getByRole('img')
         .first()
         .getAttribute('src');
      const firstImage = page.locator(`img[src="${firstImageSrc}"]`).first();
      await expect(firstImage).toBeVisible();

      // Click on the arrow for the next image
      await page.getByTestId('swiper-next-image').first().click();

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
