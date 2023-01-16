import { expect, Locator, Page } from '@playwright/test';

export class ProductPage {
   readonly page: Page;
   readonly addToCartButton: Locator;

   constructor(page: Page) {
      this.page = page;
      this.addToCartButton = this.page.getByTestId(
         'product-add-to-cart-button'
      );
   }

   async addToCart() {
      await this.addToCartButton.click();
   }

   /**
    * @description Navigates to the product page of the product with the given product handle
    */
   async gotoProduct(productHandle: string) {
      await this.page.goto(`/products/${productHandle}`);
   }

   /**
    * @description Locates and returns the product sku as a string with the format IF###-###-## or IF###-###
    */
   async getSku(): Promise<string> {
      const sku =
         (await this.page.getByTestId('product-sku').innerText())?.replace(
            'Item # ',
            ''
         ) ?? '';
      expect(sku).not.toEqual('');
      expect(sku).toMatch(/IF\d{3}-\d{3}(-\d{1,2})?$/);
      return sku;
   }
}
