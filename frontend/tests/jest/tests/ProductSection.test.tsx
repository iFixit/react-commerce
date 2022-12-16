import { screen } from '@testing-library/react';
import {
   mockMatchMedia,
   renderWithAppContext,
   getMockProduct,
   getMockProductVariant,
   getNonDiscountedProduct,
   getDiscountedProduct,
} from '../utils';
import { ProductSection } from '@templates/product/sections/ProductSection/index';
import { mockedLayoutProps } from '../__mocks__/products';

jest.mock('@templates/product/hooks/useIsProductForSale', () => ({
   ...jest.requireActual('@templates/product/hooks/useIsProductForSale'),
   useIsProductForSale: jest.fn(() => true),
}));

jest.mock('@templates/product/hooks/useProductTemplateProps', () => ({
   useProductTemplateProps: jest.fn(() => ({ ...mockedLayoutProps })),
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

   describe('Product Inventory Tests', () => {
      test('Greater than 10 stock does not render low stock message', async () => {
         const product = getMockProduct({
            variants: [
               getMockProductVariant({
                  quantityAvailable: 11,
               }),
            ],
         });

         renderWithAppContext(
            <ProductSection
               product={product}
               selectedVariant={product.variants[0]}
               onVariantChange={jest.fn()}
               internationalBuyBox={null}
            />
         );

         const lowStockMessage = screen.queryByTestId(
            'product-inventory-message'
         );
         (expect(lowStockMessage) as any).not.toBeInTheDocument();
      });

      test('Less than 10 stock renders low stock message', async () => {
         const quantity = 9;
         const product = getMockProduct({
            variants: [
               getMockProductVariant({
                  quantityAvailable: quantity,
               }),
            ],
         });

         renderWithAppContext(
            <ProductSection
               product={product}
               selectedVariant={product.variants[0]}
               onVariantChange={jest.fn()}
               internationalBuyBox={null}
            />
         );

         const lowStockMessage = await screen.findByTestId(
            'product-inventory-message'
         );
         (expect(lowStockMessage) as any).toBeInTheDocument();
         (expect(lowStockMessage.textContent) as any).toContain(
            `Only ${quantity} left`
         );
      });

      test('Out of stock renders out of stock message and email form', async () => {
         const product = getMockProduct({
            variants: [
               getMockProductVariant({
                  quantityAvailable: 0,
               }),
            ],
         });

         renderWithAppContext(
            <ProductSection
               product={product}
               selectedVariant={product.variants[0]}
               onVariantChange={jest.fn()}
               internationalBuyBox={null}
            />
         );

         const outOfStockMessage = screen.queryByTestId(
            'product-inventory-message'
         );
         (expect(outOfStockMessage) as any).not.toBeInTheDocument();

         const notifyMeForm = screen.queryByText(/this item is currently/i);
         (expect(notifyMeForm) as any).toBeInTheDocument();
         (expect(notifyMeForm?.textContent) as any).toEqual(
            'This item is currently Out of Stock'
         );
      });
   });
});
