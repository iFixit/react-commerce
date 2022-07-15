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

      (expect(shortDescription) as any).toBeInTheDocument();
      (expect(asFragment()) as any).toMatchSnapshot();
   });
});
