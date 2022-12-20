import { screen } from '@testing-library/react';
import {
   renderWithAppContext,
   getMockProduct,
   getMockProductVariant,
   getReviewsResponse,
} from '../utils';
import { ReviewsSection } from '@templates/product/sections/ReviewsSection/index';
import { useProductReviews } from 'templates/product/hooks/useProductReviews';

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
         <ReviewsSection
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
         <ReviewsSection
            product={getMockProduct()}
            selectedVariant={getMockProductVariant()}
         />
      );

      const expectedReviewAverage = screen.getByText(
         `${reviewResponse.average}`
      );
      (expect(expectedReviewAverage) as any).toBeVisible();

      const expectedReviewCount = screen.getByText(
         `${reviewResponse.count} reviews`
      );
      (expect(expectedReviewCount) as any).toBeVisible();

      const seeMoreReviewsButton = await screen.findByText(/see more reviews/i);
      (expect(seeMoreReviewsButton) as any).toBeVisible();

      const noReviewsYetText = await screen.queryByText(/no reviews yet/i);
      (expect(noReviewsYetText) as any).not.toBeInTheDocument();
   });

});
