import { Page } from '@playwright/test';

export const interceptLogin = async (page: Page, userParams?: Object) => {
   const defaultUser = {
      userid: 1,
      algoliaApiKeyProduct: null,
      username: 'john',
      unique_username: 'john123',
   };

   await page.route('**/api/2.0/user', (route) =>
      route.fulfill({
         status: 200,
         contentType: 'application/json',
         body: JSON.stringify({
            ...defaultUser,
            ...userParams,
         }),
      })
   );
};
