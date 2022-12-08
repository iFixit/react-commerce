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

   test('note renders', async () => {
      const productVariant = { ...mockedProductVariant, note: 'Mocked Note' };

      renderWithAppContext(
         <ProductSection
            product={mockedProduct}
            selectedVariant={productVariant}
            onVariantChange={jest.fn()}
            internationalBuyBox={null}
         />
      );

      const note = await screen.findByTestId('product-note');
      (expect(note) as any).toBeInTheDocument();
      (expect(note.textContent) as any).toContain('Mocked Note');
   });

   test('disclaimer renders', async () => {
      const productVariant = {
         ...mockedProductVariant,
         disclaimer: 'Mocked Disclaimer',
      };

      renderWithAppContext(
         <ProductSection
            product={mockedProduct}
            selectedVariant={productVariant}
            onVariantChange={jest.fn()}
            internationalBuyBox={null}
         />
      );

      const disclaimer = await screen.findByTestId('product-disclaimer');
      (expect(disclaimer) as any).toBeInTheDocument();
      (expect(disclaimer.textContent) as any).toContain('Mocked Disclaimer');
   });

   test('warning renders', async () => {
      const productVariant = {
         ...mockedProductVariant,
         warning: 'Mocked Warning',
      };

      renderWithAppContext(
         <ProductSection
            product={mockedProduct}
            selectedVariant={productVariant}
            onVariantChange={jest.fn()}
            internationalBuyBox={null}
         />
      );

      const warning = await screen.findByTestId('product-warning');
      (expect(warning) as any).toBeInTheDocument();
      (expect(warning.textContent) as any).toContain('Mocked Warning');
   });

   test('descriptors do not render', async () => {
      const productVariant = {
         ...mockedProductVariant,
         note: '',
         warning: '',
         disclaimer: '',
      };

      renderWithAppContext(
         <ProductSection
            product={mockedProduct}
            selectedVariant={productVariant}
            onVariantChange={jest.fn()}
            internationalBuyBox={null}
         />
      );

      const warning = screen.queryByTestId('product-warning');
      const note = screen.queryByTestId('product-note');
      const disclaimer = screen.queryByTestId('product-disclaimer');

      (expect(warning) as any).not.toBeInTheDocument();
      (expect(note) as any).not.toBeInTheDocument();
      (expect(disclaimer) as any).not.toBeInTheDocument();
   });
});
