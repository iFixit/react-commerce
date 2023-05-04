import { Page } from '@playwright/test';
import { get } from 'lodash';

export const interceptLogin = async (page: Page, userParams?: Object) => {
   const defaultUser = {
      userid: 1,
      algoliaApiKeyProduct: null,
      username: 'john',
      unique_username: 'john123',
      privileges: [],
      teams: [],
      links: {},
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

export const waitForAlgoliaSearch = async (page: Page) => {
   return page.waitForResponse(async (response) => {
      return (
         response.url().includes('1/indexes/*/queries') &&
         response.status() === 200
      );
   });
};

/*
 * This function is used to resolve a path in an object using dot notation.
 * It is a way to mimic the `its` function in Cypress by using
 * lodash's `get` function.
 *
 * Usage:
 * Let's say you have the following object:
 * const obj = {
 *   foo: {
 *    bar: {
 *     baz: 'hello'
 *   }
 * }
 *
 * And you want to get the value of baz, you can use this function like so:
 * resolvePath(obj, 'foo.bar.baz') // returns 'hello'
 */
export function resolvePath(obj: Object, path: string) {
   return get(obj, path);
}
