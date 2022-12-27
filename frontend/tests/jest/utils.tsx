import { AppProviders } from '@components/common';
import { CurrencyCode } from '@lib/shopify-storefront-sdk';
import { ProductReview, ProductReviewData } from '@models/product';
import { ProductSearchHit } from '@models/product-list';
import type { Product, ProductVariant } from '@models/product.server';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import {
   mockedBatteryProduct,
   mockedPartProduct,
   mockedProduct,
   mockedProductSearchHit,
   mockedProductVariant,
   mockedReviews,
   mockedToolProduct,
} from './__mocks__/products';

/* This is needed if there is some code that uses a method which is not available in the jsdom environment yet
 * https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
 */
export const mockMatchMedia = () => {
   Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
         matches: false,
         media: query,
         onchange: null,
         addListener: jest.fn(), // deprecated
         removeListener: jest.fn(), // deprecated
         addEventListener: jest.fn(),
         removeEventListener: jest.fn(),
         dispatchEvent: jest.fn(),
      })),
   });
};

export const GlobalContextProvider = ({
   // @ts-ignore
   children,
   ifixitOrigin = 'www.cominor.com',
}) => {
   return <AppProviders ifixitOrigin={ifixitOrigin}>{children}</AppProviders>;
};

export const renderWithAppContext = (
   ui: any,
   options?: RenderOptions
): RenderResult => render(ui, { wrapper: GlobalContextProvider, ...options });

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
      ...mockedProductVariant,
      ...overrides,
   };
};

export const getMockProductSearchHit = (
   overrides: Partial<ProductSearchHit> = {}
): ProductSearchHit => {
   return {
      ...mockedProductSearchHit,
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
               currencyCode: CurrencyCode.Usd,
            },
            compareAtPrice: {
               amount: originalPrice,
               currencyCode: CurrencyCode.Usd,
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
               currencyCode: CurrencyCode.Usd,
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

export const getReviewsResponse = (
   type: 'filled' | 'empty' = 'filled'
): ProductReviewData => {
   let reviews: ProductReview[] = mockedReviews;

   if (type === 'empty') {
      reviews = [];
   }

   return {
      reviews: reviews,
      count: reviews.length,
      average:
         reviews.length == 0
            ? 0
            : reviews.reduce((total, next) => total + (next.rating || 0), 0) /
              reviews.length,
      groupedReviews: {
         1: reviews.filter((review) => review.rating == 1).length,
         2: reviews.filter((review) => review.rating == 2).length,
         3: reviews.filter((review) => review.rating == 3).length,
         4: reviews.filter((review) => review.rating == 4).length,
         5: reviews.filter((review) => review.rating == 5).length,
      },
   };
};
