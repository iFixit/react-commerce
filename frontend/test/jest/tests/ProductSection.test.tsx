import { screen } from '@testing-library/react';
import { mockMatchMedia, renderWithAppContext } from '../utils';
import { ProductSection } from '@templates/product/sections/ProductSection/index';
import { mockedProduct, mockedProductVariant } from '../__mocks__/products';

jest.mock('@templates/product/hooks/useIsProductForSale');

describe('ProductSection Tests', () => {
   beforeAll(() => {
      mockMatchMedia();
   });

   test('renders product description', async () => {
      // @ts-ignore
      renderWithAppContext(
         <ProductSection
            product={mockedProduct}
            selectedVariant={{
               ...mockedProductVariant,
               description: 'Mocked Product Description',
            }}
            onVariantChange={jest.fn()}
            internationalBuyBox={null}
         />
      );

      const description = await screen.findByText(
         /mocked product description/i
      );
      (expect(description) as any).toBeInTheDocument();
   });
});
