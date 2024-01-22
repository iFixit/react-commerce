import { act, screen, waitFor, within } from '@testing-library/react';
import {
   mockMatchMedia,
   renderWithAppContext,
   mockResizeObserver,
   mockIntersectionObserver,
} from '../utils';
import { ProductOverviewSection } from '@templates/product/sections/ProductOverviewSection/index';
import {
   getMockProduct,
   getMockProductVariant,
   getDiscountedProduct,
   getNonDiscountedProduct,
   getProductOfType,
   getProductWithWarranty,
} from '../__mocks__/products';
import { mockedLayoutProps } from '../__mocks__/useProductTemplateProps';

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
      mockResizeObserver();
      mockIntersectionObserver();
   });

   describe('Product Description Tests', () => {
      test('renders product description', async () => {
         // @ts-ignore
         renderWithAppContext(
            <ProductOverviewSection
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
            <ProductOverviewSection
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
            <ProductOverviewSection
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
            <ProductOverviewSection
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
            <ProductOverviewSection
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
            <ProductOverviewSection
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
            <ProductOverviewSection
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
            <ProductOverviewSection
               product={nonDiscountedProduct}
               selectedVariant={nonDiscountedProduct.variants[0]}
               onVariantChange={jest.fn()}
               internationalBuyBox={null}
            />
         );

         const productPrice = await screen.findByTestId(
            'product-price-section'
         );
         const price = within(productPrice).getByTestId('price');

         expect(price).toBeInTheDocument();
         expect(price.textContent).toContain('$29.99');
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
            <ProductOverviewSection
               product={discountedProduct}
               selectedVariant={discountedProduct.variants[0]}
               onVariantChange={jest.fn()}
               internationalBuyBox={null}
            />
         );

         const productPrice = await screen.findByTestId(
            'product-price-section'
         );
         const price = within(productPrice).getByTestId('price');
         expect(price).toBeInTheDocument();
         expect(price.textContent).toContain('$' + discountPrice);

         const discountBadge =
            within(productPrice).getByTestId('product-discount');
         expect(discountBadge).toBeInTheDocument();
         expect(discountBadge.textContent).toContain(
            discountPercentage + '% OFF'
         );
      });
   });

   describe('Product Specification Tests', () => {
      test('renders product specifications', async () => {
         renderWithAppContext(
            <ProductOverviewSection
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
            <ProductOverviewSection
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
            <ProductOverviewSection
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
            <ProductOverviewSection
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

   describe('Prop 65 Warning Tests', () => {
      test('renders prop 65 warning', async () => {
         const battery = getProductOfType('battery');

         renderWithAppContext(
            <ProductOverviewSection
               product={battery}
               selectedVariant={battery.variants[0]}
               onVariantChange={jest.fn()}
               internationalBuyBox={null}
            />
         );
         const prop65WarningText = await screen.findByText(/prop 65 warning/i);
         (expect(prop65WarningText) as any).toBeVisible();
      });

      test('does not render prop 65 warning', async () => {
         const tool = getProductOfType('tool');

         renderWithAppContext(
            <ProductOverviewSection
               product={tool}
               selectedVariant={tool.variants[0]}
               onVariantChange={jest.fn()}
               internationalBuyBox={null}
            />
         );
         (
            expect(screen.queryByText(/prop 65 warning/i)) as any
         ).not.toBeInTheDocument();
      });

      test('renders prop 65 info popup', async () => {
         const battery = getProductOfType('battery');

         renderWithAppContext(
            <ProductOverviewSection
               product={battery}
               selectedVariant={battery.variants[0]}
               onVariantChange={jest.fn()}
               internationalBuyBox={null}
            />
         );

         act(() => {
            screen.getByLabelText('read more about the warning').click();
         });

         waitFor(() => {
            (
               expect(
                  screen.queryByText(
                     /This product can expose you to chemicals including lead/i
                  )
               ) as any
            ).toBeVisible();
         });
      });
   });

   describe('Product Warranty Tests', () => {
      test('renders the lifetime guarantee warranty', async () => {
         const fullWarrantyProduct = getProductWithWarranty('full');

         renderWithAppContext(
            <ProductOverviewSection
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
            <ProductOverviewSection
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
            <ProductOverviewSection
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
            <ProductOverviewSection
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
            <ProductOverviewSection
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
            <ProductOverviewSection
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
            'This item is currently Out of Stock.'
         );
      });

      test('Product with no image', async () => {
         const product = getMockProduct({
            images: [],
            variants: [
               getMockProductVariant({
                  image: null,
               }),
            ],
         });

         renderWithAppContext(
            <ProductOverviewSection
               product={product}
               selectedVariant={product.variants[0]}
               onVariantChange={jest.fn()}
               internationalBuyBox={null}
            />
         );

         const imagePlaceholders = screen.queryAllByText(
            /No photos available for this product/i
         );
         // We have 2 image placeholders in the dom where one of them is hidden
         // and the other is visible (due to different viewports).
         imagePlaceholders.forEach((el) =>
            (expect(el) as any).toBeInTheDocument()
         );
      });
   });
});
