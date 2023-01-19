import { SetupServerApi } from 'msw/node';
import { ProductPage } from './product-page';
import { CartDrawer } from './cart-drawer';
import Server from './custom-nextjs-server';

export type ProductFixtures = {
   productPage: ProductPage;
   cartDrawer: CartDrawer;
};

export type CustomNextjsServer = {
   serverRequestInterceptor: SetupServerApi;
   port: number;
};

export { ProductPage, CartDrawer, Server };
