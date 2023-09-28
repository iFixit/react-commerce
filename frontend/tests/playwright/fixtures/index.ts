import { ProductPage } from './product-page';
import { PartsPage } from './parts-page';
import { CartDrawer } from './cart-drawer';
import Server from './custom-nextjs-server';
export type { CustomNextjsServer } from './custom-nextjs-server';
import { findProductQueryMock } from './shopify-mocked-queries';
import { traceOutputDirTemplate } from './trace-override';
import type { TestInfo } from '@playwright/test';
import { getProductListMock } from './strapi-mocked-queries';

export type ProductFixtures = {
   partsPage: PartsPage;
   productPage: ProductPage;
   cartDrawer: CartDrawer;
   findProductQueryMock: typeof findProductQueryMock;
   getProductListMock: typeof getProductListMock;
   testInfo: TestInfo;
};

export {
   PartsPage,
   ProductPage,
   CartDrawer,
   Server,
   findProductQueryMock,
   getProductListMock,
   traceOutputDirTemplate,
};
