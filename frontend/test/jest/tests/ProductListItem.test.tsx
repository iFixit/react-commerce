import { render, screen } from '@testing-library/react';
import { ProductListItem } from '@templates/product-list/sections/FilterableProductsSection/ProductList';
import { mockProduct } from 'test/jest/__mocks__/mockProduct';

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

   it('renders and matches the snapshot', () => {
      // @ts-ignore
      const { asFragment } = render(<ProductListItem product={mockProduct} />);
      const shortDescription = screen.getByText(
         'Replace a dead or malfunctioning model EB-BG96aasd5ABE battery in a Samsung Galaxy S9 Plus smartphone.'
      );

      (expect(shortDescription) as any).toBeInTheDocument();
      (expect(asFragment()) as any).toMatchSnapshot();
   });

   it('renders without the review stars', () => {
      // We don't render the stars if the rating <= 4 AND rating_count < 10
      mockProduct.rating = 3.5;
      mockProduct.rating_count = 9;

      // @ts-ignore
      render(<ProductListItem product={mockProduct} />);

      const reviewStars = screen.queryByTestId('reviewStars');
      (expect(reviewStars) as any).not.toBeInTheDocument();
   });

   it('renders with the review stars', () => {
      // We render the stars if the rating >= 4 OR rating_count > 10

      // If rating < 4; count > 10
      mockProduct.rating = 1;
      mockProduct.rating_count = 15;
      // @ts-ignore
      const { rerender } = render(<ProductListItem product={mockProduct} />);
      const reviewStars = screen.queryByTestId('reviewStars');
      (expect(reviewStars) as any).toBeInTheDocument();

      // If rating > 4; count < 10
      mockProduct.rating = 5;
      mockProduct.rating_count = 5;
      // @ts-ignore
      rerender(<ProductListItem product={mockProduct} />);
      (expect(reviewStars) as any).toBeInTheDocument();

      // If rating > 4; count > 10
      mockProduct.rating = 5;
      mockProduct.rating_count = 15;
      // @ts-ignore
      rerender(<ProductListItem product={mockProduct} />);
      (expect(reviewStars) as any).toBeInTheDocument();
   });
});
