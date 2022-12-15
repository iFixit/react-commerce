import { act, screen, waitFor } from '@testing-library/react';
import {
   mockMatchMedia,
   renderWithAppContext,
   getMockProduct,
   getMockProductVariant,
   getNonDiscountedProduct,
   getDiscountedProduct,
} from '../utils';
import { ProductSection } from '@templates/product/sections/ProductSection/index';

jest.mock('@templates/product/hooks/useIsProductForSale', () => ({
   ...jest.requireActual('@templates/product/hooks/useIsProductForSale'),
   useIsProductForSale: jest.fn(() => true),
}));

describe('ProductSection Tests', () => {
   beforeAll(() => {
      mockMatchMedia();
   });

   describe('Product Description Tests', () => {
      test('renders product description', async () => {
         // @ts-ignore
         renderWithAppContext(
            <ProductSection
               product={getMockProduct()}
               selectedVariant={getMockProductVariant({
                  description: 'Mocked Product Description',
               })}
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
         const productVariant = getMockProductVariant({ note: 'Mocked Note' });

         renderWithAppContext(
            <ProductSection
               product={getMockProduct()}
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
         const productVariant = getMockProductVariant({
            disclaimer: 'Mocked Disclaimer',
         });

         renderWithAppContext(
            <ProductSection
               product={getMockProduct()}
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
         const productVariant = getMockProductVariant({
            warning: 'Mocked Warning',
         });

         renderWithAppContext(
            <ProductSection
               product={getMockProduct()}
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
         const productVariant = getMockProductVariant({
            note: '',
            warning: '',
            disclaimer: '',
         });

         renderWithAppContext(
            <ProductSection
               product={getMockProduct()}
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

      test('compatibility renders', async () => {
         renderWithAppContext(
            <ProductSection
               product={getMockProduct()}
               selectedVariant={getMockProductVariant()}
               onVariantChange={jest.fn()}
               internationalBuyBox={null}
            />
         );

         (
            expect(screen.getByTestId('product-compatibility-dropdown')) as any
         ).not.toBeVisible();

         act(() => {
            screen.getByRole('button', { name: /compatibility/i }).click();
         });

         waitFor(() => {
            (
               expect(
                  screen.getByTestId('product-compatibility-dropdown')
               ) as any
            ).toBeVisible();
         });
      });

      test('compatibility does not render', async () => {
         const mockProduct = getMockProduct({
            compatibility: null,
         });

         renderWithAppContext(
            <ProductSection
               product={mockProduct}
               selectedVariant={getMockProductVariant()}
               onVariantChange={jest.fn()}
               internationalBuyBox={null}
            />
         );

         (
            expect(
               screen.getByRole('button', {
                  name: /compatibility/i,
                  hidden: true,
               })
            ) as any
         ).not.toBeVisible();
      });
   });

   describe('Product Price Tests', () => {
      test('Regular Price Renders', async () => {
         const nonDiscountedProduct = getNonDiscountedProduct(29.99);

         renderWithAppContext(
            <ProductSection
               product={nonDiscountedProduct}
               selectedVariant={nonDiscountedProduct.variants[0]}
               onVariantChange={jest.fn()}
               internationalBuyBox={null}
            />
         );

         const price = await screen.findByTestId('product-price');

         (expect(price) as any).toBeInTheDocument();
         (expect(price.textContent) as any).toBe('$29.99');
      });

      test('Discounted Price Renders', async () => {
         const originalPrice = 29.99;
         const discountPercentage = 10;
         const discountPrice = (
            originalPrice -
            (originalPrice * discountPercentage) / 100
         ).toFixed(2);

         const discountedProduct = getDiscountedProduct(29.99, 10);

         renderWithAppContext(
            <ProductSection
               product={discountedProduct}
               selectedVariant={discountedProduct.variants[0]}
               onVariantChange={jest.fn()}
               internationalBuyBox={null}
            />
         );

         const price = await screen.findByTestId('product-price');
         (expect(price) as any).toBeInTheDocument();
         (expect(price.textContent) as any).toBe('$' + discountPrice);

         // Get the parent element of the element
         const parentElement = price.parentElement;

         // Get all of the children of the parent element
         const children = parentElement?.children;

         // Filter out the element itself to get only its siblings
         const siblings = Array.prototype.filter.call(
            children,
            (child: HTMLElement) => {
               return child !== price;
            }
         );

         const priceTexts = [discountPercentage + '% OFF', '$' + originalPrice];

         siblings.forEach((sibling: HTMLElement) => {
            (expect(priceTexts) as any).toContain(sibling.textContent);
         });
      });
   });
});
