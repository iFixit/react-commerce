import { screen } from '@testing-library/react';
import {
   mockMatchMedia,
   renderWithAppContext,
   getMockProduct,
   getMockProductVariant,
   getNonDiscountedProduct,
   getDiscountedProduct,
   getProductOfType,
   getProductWithWarranty,
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

   describe('Product Specification Tests', () => {
      test('renders product specifications', async () => {
         renderWithAppContext(
            <ProductSection
               product={getMockProduct()}
               selectedVariant={getMockProductVariant({
                  specifications: 'Mocked Product Specification',
               })}
               onVariantChange={jest.fn()}
               internationalBuyBox={null}
            />
         );

         const specification = await screen.findByText(
            /mocked product specification/i
         );
         (expect(specification) as any).toBeInTheDocument();
      });

      test('specifications accordion is hidden if no specifications', async () => {
         renderWithAppContext(
            <ProductSection
               product={getMockProduct()}
               selectedVariant={getMockProductVariant({
                  specifications: null,
               })}
               onVariantChange={jest.fn()}
               internationalBuyBox={null}
            />
         );

         const specificationsAccordion = await screen.queryByText(
            /Specification/i
         );
         (expect(specificationsAccordion) as any).not.toBeVisible();
      });
   });

   describe('Product Shipping Restrinctions Tests', () => {
      test('renders shipping restrictions', async () => {
         const battery = getProductOfType('battery');
         renderWithAppContext(
            <ProductSection
               product={battery}
               selectedVariant={battery.variants[0]}
               onVariantChange={jest.fn()}
               internationalBuyBox={null}
            />
         );
         const shippingRestrictionText = await screen.findByText(
            /shipping restrictions apply/i
         );
         (expect(shippingRestrictionText) as any).toBeVisible();

         const batteryShippingInfo = screen.getByText(
            'Batteries may only be shipped within the contiguous USA at this time and may only ship via standard shipping.'
         );
         (expect(batteryShippingInfo) as any).toBeInTheDocument();
      });

      test('does not render shipping restrictions', async () => {
         const tool = getProductOfType('tool');
         renderWithAppContext(
            <ProductSection
               product={tool}
               selectedVariant={tool.variants[0]}
               onVariantChange={jest.fn()}
               internationalBuyBox={null}
            />
         );
         const shippingRestrictionText = await screen.queryByText(
            /shipping restrictions apply/i
         );
         (expect(shippingRestrictionText) as any).not.toBeInTheDocument();
      });
   });

   describe('Product Warranty Tests', () => {
      test('renders the lifetime guarantee warranty', async () => {
         const fullWarrantyProduct = getProductWithWarranty('full');

         renderWithAppContext(
            <ProductSection
               product={fullWarrantyProduct}
               selectedVariant={fullWarrantyProduct.variants[0]}
               onVariantChange={jest.fn()}
               internationalBuyBox={null}
            />
         );
         const lifetimeGuaranteeText = await screen.findByText(
            /lifetime guarantee/i
         );
         (expect(lifetimeGuaranteeText) as any).toBeVisible();
         (
            expect(
               screen.getByRole('link', { name: 'Lifetime Guarantee' })
            ) as any
         ).toHaveAttribute('href', 'www.cominor.com/Info/Warranty');

         // We display quality guarantee icon for products with lifetime warrant
         const qualityGuaranteeIcon = await screen.findByTestId(
            'quality-guarantee-icon'
         );
         (expect(qualityGuaranteeIcon) as any).toBeVisible();
      });

      test('renders the limited warranty', async () => {
         const limitedWarrantyProduct = getProductWithWarranty('limited');

         renderWithAppContext(
            <ProductSection
               product={limitedWarrantyProduct}
               selectedVariant={limitedWarrantyProduct.variants[0]}
               onVariantChange={jest.fn()}
               internationalBuyBox={null}
            />
         );
         const warrantyText = await screen.findByText(/One year warranty/i);
         (expect(warrantyText) as any).toBeVisible();
         (
            expect(
               screen.getByRole('link', { name: 'One year warranty' })
            ) as any
         ).toHaveAttribute('href', 'www.cominor.com/Info/Warranty');
      });

      test('renders the as-is warranty', async () => {
         const asIsWarrantyProduct = getProductWithWarranty('as-is');

         renderWithAppContext(
            <ProductSection
               product={asIsWarrantyProduct}
               selectedVariant={asIsWarrantyProduct.variants[0]}
               onVariantChange={jest.fn()}
               internationalBuyBox={null}
            />
         );
         const warrantyText = await screen.findByText(
            /Sold as-is; no refunds or returns/i
         );
         (expect(warrantyText) as any).toBeVisible();
         (
            expect(
               screen.getByRole('link', {
                  name: 'Sold as-is; no refunds or returns',
               })
            ) as any
         ).toHaveAttribute('href', 'www.cominor.com/Info/Warranty');
      });
   });
});
