import { ProductPage } from './product-page';
import { CartDrawer } from './cart-drawer';
import Server from './custom-nextjs-server';
export type { CustomNextjsServer } from './custom-nextjs-server';
import { findProductQueryMock } from './shopify-mocked-queries';
import { traceOutputDirTemplate } from './trace-override';
import type { TestInfo } from '@playwright/test';

export type ProductFixtures = {
   productPage: ProductPage;
   cartDrawer: CartDrawer;
   findProductQueryMock: typeof findProductQueryMock;
   testInfo: TestInfo;
};

export {
   ProductPage,
   CartDrawer,
   Server,
   findProductQueryMock,
   traceOutputDirTemplate,
};
