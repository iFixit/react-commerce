import { ProductPage } from './product-page';
import { CartDrawer } from './cart-drawer';
import Server from './custom-nextjs-server';
export type { CustomNextjsServer } from './custom-nextjs-server';

export type ProductFixtures = {
   productPage: ProductPage;
   cartDrawer: CartDrawer;
};

export { ProductPage, CartDrawer, Server };
