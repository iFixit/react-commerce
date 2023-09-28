import { test, expect } from '../test-fixtures';

test.describe('Product Reviews on Product Page', () => {
   test('Load More Reviews', async ({ productPage }) => {
      await productPage.gotoProduct('repair-business-toolkit');

      const reviewsCountBefore = await productPage.page
         .getByTestId('product-review-line-item')
         .count();

      await productPage.page
         .getByRole('button', { name: /see more reviews/gi })
         .click();

      const reviewsAfter = productPage.page.getByTestId(
         'product-review-line-item'
      );
      const reviewsCountAfter = await reviewsAfter.count();
      expect(reviewsCountAfter).toBeGreaterThan(reviewsCountBefore);

      for (let i = 0; i < reviewsCountAfter; i++) {
         await expect(reviewsAfter.nth(i)).toBeVisible();
      }
   });
});
