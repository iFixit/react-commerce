import { Page, Locator } from '@playwright/test';

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

   async getItem(sku: string): Promise<Locator> {
      const cartDrawer = this.page.getByTestId('cart-drawer');
      return cartDrawer.getByRole('listitem').filter({ hasText: sku });
   }

   /**
    * @param sku The sku of the item to increase the quantity of.
    */
   async increaseItemQuantity(sku: string): Promise<void> {
      await (await this.getItem(sku))
         .getByTestId('cart-drawer-increase-quantity')
         .click();
   }

   /**
    * @param sku The sku of the item to decrease the quantity of.
    */
   async decreaseItemQuantity(sku: string): Promise<void> {
      await (await this.getItem(sku))
         .getByTestId('cart-drawer-decrease-quantity')
         .click();
   }

   /**
    * @param sku The sku of the item to remove.
    */
   async removeItem(sku: string): Promise<void> {
      await (await this.getItem(sku))
         .getByTestId('cart-drawer-remove-item')
         .click();
   }
}
