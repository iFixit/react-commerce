import { render, screen } from '@testing-library/react';
import { ProductListItem } from '@templates/product-list/sections/FilterableProductsSection/ProductList';
import * as ProductSearch from '@templates/product-list/sections/FilterableProductsSection/useProductSearchHitPricing';
import { mockProduct } from 'test/jest/__mocks__/mockProduct';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { theme } from '@ifixit/ui/theme';

jest.mock('@ifixit/app');

// We cannot import the actual theme in AppProviders since there are absolute dependencies
// towards the frontend folder in packages
const mockTheme = extendTheme({
   ...theme,
   sizes: {
      ...theme.sizes,
      header: '68px',
   },
   zIndices: {
      ...theme.zIndices,
      header: 2000,
   },
   styles: {
      ...theme.styles,
      global: {
         ...theme.styles?.global,
         body: {
            // @ts-ignore
            ...theme.styles?.global?.body,
            touchAction: 'pan-x pan-y',
         },
      },
   },
});

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
      const { asFragment } = render(
         <ChakraProvider theme={mockTheme}>
            {/* @ts-ignore */}
            <ProductListItem product={mockProduct} />
         </ChakraProvider>
      );
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

      render(
         <ChakraProvider theme={mockTheme}>
            {/* @ts-ignore */}
            <ProductListItem product={mockProduct} />
         </ChakraProvider>
      );

      const reviewStars = screen.queryByTestId('reviewStars');
      (expect(reviewStars) as any).not.toBeInTheDocument();
   });

   it('renders with the review stars', () => {
      // We render the stars if the rating >= 4 OR rating_count > 10

      // If rating < 4; count > 10
      mockProduct.rating = 1;
      mockProduct.rating_count = 15;

      const { rerender } = render(
         <ChakraProvider theme={mockTheme}>
            {/* @ts-ignore */}
            <ProductListItem product={mockProduct} />
         </ChakraProvider>
      );
      const reviewStars = screen.queryByTestId('reviewStars');
      (expect(reviewStars) as any).toBeInTheDocument();

      // If rating > 4; count < 10
      mockProduct.rating = 5;
      mockProduct.rating_count = 5;

      rerender(
         <ChakraProvider theme={mockTheme}>
            {/* @ts-ignore */}
            <ProductListItem product={mockProduct} />
         </ChakraProvider>
      );
      (expect(reviewStars) as any).toBeInTheDocument();

      // If rating > 4; count > 10
      mockProduct.rating = 5;
      mockProduct.rating_count = 15;

      rerender(
         <ChakraProvider theme={mockTheme}>
            {/* @ts-ignore */}
            <ProductListItem product={mockProduct} />
         </ChakraProvider>
      );
      (expect(reviewStars) as any).toBeInTheDocument();
   });
});
