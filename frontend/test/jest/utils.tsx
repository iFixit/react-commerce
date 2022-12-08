import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { AppProviders } from '@components/common';
import { Product, ProductVariant } from '@models/product';
import {
   mockedProduct,
   mockedProductSearchHit,
   mockedProductVariant,
} from './__mocks__/products';
import { ProductSearchHit } from '@models/product-list';

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
