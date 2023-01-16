import { Page, Locator, expect } from '@playwright/test';

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

   async getItemQuantity(sku: string): Promise<number> {
      const cartItemQuantity = (await this.getItem(sku)).getByTestId(
         'cart-drawer-quantity'
      );
      return parseInt(await cartItemQuantity.innerText());
   }

   /**
    *
    * @returns The total number of items in the cart.
    */
   async getTotalQuantity(): Promise<number> {
      const cartItemQuantity = this.page.getByTestId('cart-drawer-item-count');
      return parseInt(await cartItemQuantity.innerText());
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

   /**
    * @param sku The sku of the item to assert the quantity of.
    * @param quantity The expected quantity of the item.
    */
   async assertItemQuantity(sku: string, quantity: number): Promise<void> {
      expect(await this.getItemQuantity(sku)).toBe(quantity);
   }

   async assertCartTotalQuantity(quantity: number): Promise<void> {
      expect(await this.getTotalQuantity()).toBe(quantity);
   }
}
