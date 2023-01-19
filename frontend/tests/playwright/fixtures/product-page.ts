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

   /**
    * @description Locates and returns the current product price as a string with the format $###.## or $###
    */
   async getCurrentPrice(): Promise<number> {
      const price = await this.page
         .getByTestId('product-price-section')
         .getByTestId('current-price')
         .textContent();
      expect(price).not.toEqual('');
      expect(price).toMatch(/\$[0-9]+(\.[0-9]{1,2})?$/);
      return parseFloat(price!.slice(1));
   }

   /**
    * @description Locates and returns the original product price as a string with the format $###.## or $###
    */
   async getDiscountedPrice(): Promise<number> {
      const price = await this.page
         .getByTestId('product-price-section')
         .getByTestId('compare-at-price')
         .textContent();
      expect(price).not.toEqual('');
      expect(price).toMatch(/\$[0-9]+(\.[0-9]{1,2})?$/);
      return parseFloat(price!.slice(1));
   }

   /**
    * @note This is for the image based selector type.
    * @description returns the locator for the currently selected variant shown on the product page.
    */
   async getActiveVariant(): Promise<Locator> {
      return this.page
         .getByTestId('product-variants-selector')
         .locator('[aria-selected="true"]');
   }

   /**
    * @note This is for the image based selector type. This is also under the assumption that there are only two variants.
    * @description returns the locator for the other variant options in the product page.
    */
   async getInactiveVariant(): Promise<Locator> {
      return this.page
         .getByTestId('product-variants-selector')
         .locator('[aria-selected="false"]');
   }

   /**
    * @note This is for the image based selector type. This is also under the assumption that there are only two variants.
    * @description switches the selected variant to the inactive variant.
    */
   async switchSelectedVariant(): Promise<void> {
      await (await this.getInactiveVariant()).click();
   }
}
