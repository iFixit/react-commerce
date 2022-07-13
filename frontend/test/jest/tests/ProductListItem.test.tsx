// @ts-nocheck
import { render, screen } from '@testing-library/react';
import { ProductListItem } from '@components/product-list/sections/FilterableProductsSection/ProductList';
import * as ProductSearch from '@components/product-list/sections/FilterableProductsSection/useProductSearchHitPricing';
import * as AppContext from '@ifixit/app';
import { mockProduct } from 'test/jest/__mocks__/mockProduct';

describe('renders ProductListItem', () => {
   beforeEach(() => {
      ProductSearch.useProductSearchHitPricing = jest.fn().mockReturnValue({
         price: 5,
         compareAtPrice: 5,
         isDiscounted: 5,
         percentage: 5,
      });

      AppContext.useAppContext = jest
         .fn()
         .mockReturnValue({ ifixitOrigin: 'https://www.cominor.com' });
   });

   afterEach(() => {
      jest.clearAllMocks();
   });

   /**
    * @jest-environment jsdom
    */
   it('renders ProductListItem', () => {
      const { asFragment } = render(<ProductListItem product={mockProduct} />);
      const shortDescription = screen.getByText(
         'Replace a dead or malfunctioning model EB-BG96aasd5ABE battery in a Samsung Galaxy S9 Plus smartphone.'
      );

      expect(shortDescription).toBeInTheDocument();
      expect(asFragment()).toMatchSnapshot();
   });
});
