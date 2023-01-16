import { Page } from '@playwright/test';

export class CartDrawer {
   readonly page: Page;

   constructor(page: Page) {
      this.page = page;
   }
}
