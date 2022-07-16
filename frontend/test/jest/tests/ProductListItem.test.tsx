import { render, screen } from '@testing-library/react';
import { ProductListItem } from '@components/product-list/sections/FilterableProductsSection/ProductList';
import * as ProductSearch from '@components/product-list/sections/FilterableProductsSection/useProductSearchHitPricing';
import { mockProduct } from 'test/jest/__mocks__/mockProduct';

jest.mock('@ifixit/app');

describe('ProductListItem', () => {
   beforeEach(() => {
      // @ts-ignore
      ProductSearch.useProductSearchHitPricing = jest.fn().mockReturnValue({
         price: 5,
         compareAtPrice: 5,
         isDiscounted: 5,
         percentage: 5,
      });
   });

   afterEach(() => {
      jest.clearAllMocks();
   });

   it('renders and matches the snapshot', () => {
      // @ts-ignore
      const { asFragment } = render(<ProductListItem product={mockProduct} />);
      const shortDescription = screen.getByText(
         'Replace a dead or malfunctioning model EB-BG96aasd5ABE battery in a Samsung Galaxy S9 Plus smartphone.'
      );

      const reviewStars = screen.getByTestId('reviewStars');
      (expect(reviewStars) as any).toBeInTheDocument();

      (expect(shortDescription) as any).toBeInTheDocument();
      (expect(asFragment()) as any).toMatchSnapshot();
   });

   it('renders without the review stars and matches the snapshot', () => {
      // We don't render the stars if the rating <= 4 or rating_count < 10
      mockProduct.rating = 3.5;
      mockProduct.rating_count = 9;

      // @ts-ignore
      const { asFragment } = render(<ProductListItem product={mockProduct} />);

      const reviewStars = screen.queryByText('reviewStars');
      (expect(reviewStars) as any).not.toBeInTheDocument();
      (expect(asFragment()) as any).toMatchSnapshot();
   });
});
