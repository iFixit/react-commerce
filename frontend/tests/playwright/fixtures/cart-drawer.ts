import { Page } from '@playwright/test';

export class CartDrawer {
   readonly page: Page;

   constructor(page: Page) {
      this.page = page;
   }

   async close() {
      await this.page.getByTestId('cart-drawer-close').click();
   }

   async open() {
      await this.page.getByTestId('cart-drawer-open').click();
   }
}
