import type { Product, ProductVariant } from '@pages/api/nextjs/cache/product';
import { mockedProduct } from './generic';
import { mockedBatteryProduct } from './battery';
import { mockedToolProduct } from './tool';
import { mockedPartProduct } from './part';

/*
 * Utility functions for mocking product data
 */

export const getMockProduct = (overrides: Partial<Product> = {}): Product => {
   return {
      ...mockedProduct,
      ...overrides,
   };
};

export const getMockProductVariant = (
   overrides: Partial<ProductVariant> = {}
): ProductVariant => {
   return {
      ...mockedProduct.variants[0],
      ...overrides,
   };
};

/*
 * To match a real use case, you will need to set the selectedVariant to the
 * first variant in the variants array from the returned product.
 */
export const getDiscountedProduct = (
   originalPrice = 49.99,
   discountPercentage = 10
) => {
   const discountedPrice =
      originalPrice - originalPrice * (discountPercentage / 100);

   const product = getMockProduct({
      variants: [
         getMockProductVariant({
            price: {
               amount: discountedPrice,
               currencyCode: 'USD',
            },
            compareAtPrice: {
               amount: originalPrice,
               currencyCode: 'USD',
            },
            isDiscounted: true,
            discountPercentage: discountPercentage,
         }),
      ],
   });
   return product;
};

export const getNonDiscountedProduct = (originalPrice = 49.99) => {
   const product = getMockProduct({
      variants: [
         getMockProductVariant({
            price: {
               amount: originalPrice,
               currencyCode: 'USD',
            },
            compareAtPrice: null,
            isDiscounted: false,
            discountPercentage: 0,
         }),
      ],
   });
   return product;
};

export const getProductOfType = (type: 'battery' | 'tool' | 'part') => {
   switch (type) {
      case 'battery':
         return { ...mockedBatteryProduct };
      case 'tool':
         return { ...mockedToolProduct };
      case 'part':
         return { ...mockedPartProduct };
   }
};

/*
 * These warranty values are listed in iFixit's product warranty policy:
 * https://www.ifixit.com/Info/Warranty#Section_iFixit_Guarantees
 *
 * Full Guarantee refers to Lifetime Warranty.
 * Limited Guarantee refers to 1-Year Warranty.
 * As-Is refers to No Warranty.
 */
export const getProductWithWarranty = (
   guarantee: 'full' | 'limited' | 'as-is'
) => {
   enum Warranty {
      'full' = 'Lifetime Guarantee',
      'limited' = 'One year warranty',
      'as-is' = 'Sold as-is; no refunds or returns',
   }

   const product = getMockProduct({
      variants: [
         getMockProductVariant({
            warranty: Warranty[guarantee],
         }),
      ],
   });

   return product;
};
