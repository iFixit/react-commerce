/**
 * Playwright test fixtures are very powerful and can be used to create a custom
 * test environment.
 *
 * Fixtures can be isolated to a test or a worker depending on the scope defined.
 *
 * In addition, fixtures can be lazily loaded, which means that the fixture will
 * only be created where it is used. If a test scoped fixture is not used in a
 * test, it will not be created. If a worker scoped fixture is not used in a
 * worker, it will not be created, and if a worker scoped fixture is used in a
 * test, then it will remain instantiated for the duration of the worker.
 * Overall this a very powerful feature that can help with expensive setup
 * and teardown.
 *
 * @see https://playwright.dev/docs/test-fixtures
 */

import { test as base, expect, Page, Locator } from '@playwright/test';
import { graphql, rest } from 'msw';
import type { ProductFixtures, CustomNextjsServer } from './fixtures';
import { ProductPage, CartDrawer, Server } from './fixtures';
import { format } from 'util';
import { exec } from 'node:child_process';

export const test = base.extend<
   ProductFixtures &
      CustomNextjsServer & { graphql: typeof graphql; rest: typeof rest }, // Test Fixture types are passed as the first template parameter
   { customServer: CustomNextjsServer } // Worker Fixture types are passed as the second template parameter
>({
   customServer: [
      // eslint-disable-next-line no-empty-pattern
      async ({}, use, workerInfo) => {
         process.env.NEXT_DIST_DIR = `./.next-worker-${workerInfo.workerIndex}`;
         const props: CustomNextjsServer = await Server();
         await use(props);
         // Clean up the dist directory after the worker is done.
         exec('rm -rf .next-worker-*');
      },
      {
         /**
          * Create a new server for each worker so that the server can be booted
          * once per worker and only when it is used. After the worker is done,
          * the server will remain to be reused in other tests if needed.
          *
          * @see https://playwright.dev/docs/test-fixtures#worker-scoped-fixtures
          */
         // @ts-ignore
         scope: 'worker',
         auto: process.env.CI != null,
         timeout: 60 * 2 * 1000,
      },
   ],
   productPage: async ({ page }, use) => {
      await use(new ProductPage(page));
   },
   cartDrawer: async ({ page }, use) => {
      await use(new CartDrawer(page));
   },
   graphql,
   rest,
   /**
    * The following fixtures are dependent on the customServer fixture. By being
    * dependent on the customServer fixture, Playwright will automatically
    * instantiate the customServer fixture for the worker running the test.
    * Therefore, we do not need to directly call the customServer fixture in the
    * test to ensure the custom server is booted.
    */
   serverRequestInterceptor: [
      async ({ customServer }, use) => {
         await use(customServer.serverRequestInterceptor);
      },
      { scope: 'test' },
   ],
   port: [
      async ({ customServer }, use) => {
         await use(customServer.port);
      },
      { scope: 'test' },
   ],
});

expect.extend({
   async toBeWithinViewport(
      element: Locator,
      viewportSize: { width: number; height: number } | null
   ) {
      if (!viewportSize) {
         throw new Error('Viewport size was null.');
      }

      const boundingBox = await element.boundingBox();
      if (!boundingBox) {
         return {
            message: () => 'Element is not visible.',
            pass: false,
         };
      }

      const { x, y, width, height } = boundingBox;
      const { width: viewportWidth, height: viewportHeight } = viewportSize;

      if (
         x < 0 ||
         y < 0 ||
         x + width > viewportWidth ||
         y + height > viewportHeight
      ) {
         return {
            message: () =>
               format(
                  'Element is not within viewport. Element: %o, Viewport: %o',
                  boundingBox,
                  viewportSize
               ),
            pass: false,
         };
      }
      return {
         message: () =>
            format(
               'Element is within viewport. Element: %o, Viewport: %o',
               boundingBox,
               viewportSize
            ),
         pass: true,
      };
   },
});

export { expect };
