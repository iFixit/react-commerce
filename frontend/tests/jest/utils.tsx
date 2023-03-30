import { AppProviders } from '@components/common';
import { CurrencyCode } from '@lib/shopify-storefront-sdk';
import { ProductReview, ProductReviewData } from '@models/product/reviews';
import { ProductSearchHit } from '@models/product-list';
import type { Product, ProductVariant } from '@pages/api/nextjs/cache/product';
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

export const mockResizeObserver = () => {
   Object.defineProperty(global, 'ResizeObserver', {
      writable: true,
      value: jest.fn().mockImplementation(() => ({
         observe: jest.fn(),
         unobserve: jest.fn(),
         disconnect: jest.fn(),
      })),
   });
};

export const mockIntersectionObserver = () => {
   Object.defineProperty(global, 'IntersectionObserver', {
      writable: true,
      value: jest.fn().mockImplementation(() => ({
         observe: jest.fn(),
         unobserve: jest.fn(),
         disconnect: jest.fn(),
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
