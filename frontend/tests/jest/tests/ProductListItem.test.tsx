import { renderWithAppContext } from '../utils';
import { screen } from '@testing-library/react';
import { ProductListItem } from '@templates/product-list/sections/FilterableProductsSection/ProductList';
import { getMockProductSearchHit } from '../__mocks__/product-list';

jest.mock(
   '@templates/product-list/sections/FilterableProductsSection/useProductSearchHitPricing',
   () => ({
      ...jest.requireActual(
         '@templates/product-list/sections/FilterableProductsSection/useProductSearchHitPricing'
      ),
      useProductSearchHitPricing: jest.fn(() => {
         return {
            price: { amount: 5, currencyCode: 'usd' },
            compareAtPrice: { amount: 5, currencyCode: 'usd' },
            isDiscounted: 5,
            percentage: 5,
         };
      }),
   })
);

jest.mock('@ifixit/ui/commerce/hooks/useUserPrice', () => ({
   ...jest.requireActual('@ifixit/ui/commerce/hooks/useUserPrice'),
   useUserPrice: jest.fn(() => {
      return {
         price: { amount: 5, currencyCode: 'usd' },
         compareAtPrice: { amount: 5, currencyCode: 'usd' },
      };
   }),
}));

describe('ProductListItem', () => {
   it('renders and matches the snapshot', () => {
      // @ts-ignore
      const { asFragment } = renderWithAppContext(
         <ProductListItem product={getMockProductSearchHit()} />
      );
      const shortDescription = screen.getByText(
         'Replace a dead or malfunctioning model EB-BG96aasd5ABE battery in a Samsung Galaxy S9 Plus smartphone.'
      );

      (expect(shortDescription) as any).toBeInTheDocument();
      (expect(asFragment()) as any).toMatchSnapshot();
   });

   it('renders without the review stars', () => {
      // We don't render the stars if the rating <= 4 AND rating_count < 10
      const mockedProductSearchHitWithRating = getMockProductSearchHit({
         rating: 3.5,
         rating_count: 9,
      });

      // @ts-ignore
      renderWithAppContext(
         <ProductListItem product={mockedProductSearchHitWithRating} />
      );

      const reviewStars = screen.queryByTestId('reviewStars');
      (expect(reviewStars) as any).not.toBeInTheDocument();
   });

   it('renders with the review stars', () => {
      // We render the stars if the rating >= 4 OR rating_count > 10

      // If rating < 4; count > 10
      const mockedProductSearchHitWithRating = getMockProductSearchHit({
         rating: 1,
         rating_count: 15,
      });

      // @ts-ignore
      const { rerender } = renderWithAppContext(
         <ProductListItem product={mockedProductSearchHitWithRating} />
      );
      const reviewStars = screen.queryByTestId('reviewStars');
      (expect(reviewStars) as any).toBeInTheDocument();

      // If rating > 4; count < 10
      mockedProductSearchHitWithRating.rating = 5;
      mockedProductSearchHitWithRating.rating_count = 5;
      // @ts-ignore
      rerender(<ProductListItem product={mockedProductSearchHitWithRating} />);
      (expect(reviewStars) as any).toBeInTheDocument();

      // If rating > 4; count > 10
      mockedProductSearchHitWithRating.rating = 5;
      mockedProductSearchHitWithRating.rating_count = 15;
      // @ts-ignore
      rerender(<ProductListItem product={mockedProductSearchHitWithRating} />);
      (expect(reviewStars) as any).toBeInTheDocument();
   });
});
