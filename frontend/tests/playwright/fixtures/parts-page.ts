import { Page } from '@playwright/test';

export class PartsPage {
   readonly page: Page;
   private baseURL: string;

   constructor(page: Page, baseURL: string) {
      this.page = page;
      this.baseURL = baseURL;
   }

   updateBaseURL(baseURL: string) {
      this.baseURL = baseURL;
   }

   /**
    * @description Navigates to the parts page for a product
    */
   async goToProductParts(deviceTitle: string) {
      await this.page.goto(`${this.baseURL}/Parts/${deviceTitle}`);
   }

   /**
    * @description Navigates to the parts page for a product's item type
    */
   async goToProductPartsItemType(deviceTitle: string, itemType: String) {
      await this.page.goto(`${this.baseURL}/Parts/${deviceTitle}/${itemType}`);
   }
}
