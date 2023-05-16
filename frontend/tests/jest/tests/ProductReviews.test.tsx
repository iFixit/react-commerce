import { screen } from '@testing-library/react';
import { renderWithAppContext } from '../utils';
import { ProductReviewsSection } from '@templates/product/sections/ProductReviewsSection/index';
import { ProductRating } from '@templates/product/sections/ProductOverviewSection/ProductRating';
import { useProductReviews } from 'templates/product/hooks/useProductReviews';
import { getMockProduct, getMockProductVariant } from '../__mocks__/products';
import { getReviewsResponse } from '../__mocks__/reviews';

jest.mock('@templates/product/hooks/useProductReviews', () => ({
   useProductReviews: jest.fn(),
}));

describe('Product Reviews Tests', () => {
   beforeEach(() => {
      jest.clearAllMocks();
   });

   test('renders Reviews Section with empty reviews ', async () => {
      (useProductReviews as jest.Mock<any, any>).mockImplementation(() => ({
         data: getReviewsResponse('empty'),
      }));
      renderWithAppContext(
         <ProductReviewsSection
            product={getMockProduct()}
            selectedVariant={getMockProductVariant()}
         />
      );

      const noReviewsYetText = await screen.findByText(/no reviews yet/i);
      (expect(noReviewsYetText) as any).toBeVisible();
   });

   test('renders Reviews Section with multiple reviews ', async () => {
      const reviewResponse = getReviewsResponse();
      (useProductReviews as jest.Mock<any, any>).mockImplementation(() => ({
         data: reviewResponse,
      }));
      renderWithAppContext(
         <ProductReviewsSection
            product={getMockProduct()}
            selectedVariant={getMockProductVariant()}
         />
      );

      const expectedReviewAverage = screen.getByText(
         `${reviewResponse.average}`
      );
      (expect(expectedReviewAverage) as any).toBeVisible();

      const expectedReviewCount = screen.getByText(
         `${reviewResponse.count} ratings`
      );
      (expect(expectedReviewCount) as any).toBeVisible();

      const seeMoreReviewsButton = await screen.findByText(/see more reviews/i);
      (expect(seeMoreReviewsButton) as any).toBeVisible();

      const noReviewsYetText = await screen.queryByText(/no reviews yet/i);
      (expect(noReviewsYetText) as any).not.toBeInTheDocument();
   });

   /*
    * On product page, we display ProductRating on top of the page
    * and ReviewsSection at the bottom.
    *
    * This test is to confirm that we display the same/matching
    * number of reviews and review average for both components.
    */
   test('Product Section and Reviews Section review stars match', async () => {
      const reviewsResponseWithReviews = getReviewsResponse();
      const reviewsCount = reviewsResponseWithReviews.count; // 6
      const ratingValue = reviewsResponseWithReviews.average!; // 4.5

      renderWithAppContext(
         <ProductRating
            product={getMockProduct({
               reviews: {
                  rating: ratingValue,
                  count: reviewsCount ?? 0,
               },
            })}
         />
      );

      (useProductReviews as jest.Mock<any, any>).mockImplementation(() => ({
         data: reviewsResponseWithReviews,
      }));
      renderWithAppContext(
         <ProductReviewsSection
            product={getMockProduct()}
            selectedVariant={getMockProductVariant()}
         />
      );

      // Assert that we find 2 of the expected texts
      const reviewAverageValue = screen.getAllByText(
         `${reviewsResponseWithReviews.average}`
      );
      (expect(reviewAverageValue.length) as any).toBe(2);

      const expectedRatingCountText = screen.getAllByText(
         `${reviewsResponseWithReviews.count} ratings`
      );
      (expect(expectedRatingCountText.length) as any).toBe(1);
      const expectedReviewCountText = screen.getAllByText(
         `${reviewsResponseWithReviews.count} reviews`
      );
      (expect(expectedReviewCountText.length) as any).toBe(1);
   });
});
