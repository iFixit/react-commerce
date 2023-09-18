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

import { test as base, expect, Locator } from '@playwright/test';
import { ProductFixtures, CustomNextjsServer } from './fixtures';
import {
   PartsPage,
   ProductPage,
   CartDrawer,
   Server,
   findProductQueryMock,
   getProductListMock,
   traceOutputDirTemplate,
} from './fixtures';
import type { MockServiceWorker } from 'playwright-msw';
import { createWorkerFixture } from 'playwright-msw';
import { format } from 'util';
import { handlers } from './msw/handlers';
import { exec } from 'node:child_process';
import { cloneDeep } from 'lodash';

const test = base.extend<
   ProductFixtures &
      CustomNextjsServer & {
         clientRequestHandler: MockServiceWorker;
      }, // Test Fixture types are passed as the first template parameter
   { customServer: CustomNextjsServer } // Worker Fixture types are passed as the second template parameter
>({
   customServer: [
      // eslint-disable-next-line no-empty-pattern
      async ({}, use, workerInfo) => {
         process.env.NEXT_DIST_DIR = process.env.CI
            ? './.next'
            : `./.next-worker-${workerInfo.workerIndex}`;
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
   productPage: async ({ page, baseURL }, use) => {
      await use(new ProductPage(page, baseURL ?? 'http://localhost:3000'));
   },
   partsPage: async ({ page, baseURL }, use) => {
      await use(new PartsPage(page, baseURL ?? 'http://localhost:3000'));
   },
   cartDrawer: async ({ page }, use) => {
      await use(new CartDrawer(page));
   },
   testInfo: [
      // eslint-disable-next-line no-empty-pattern
      async ({}, use, testInfo) => {
         testInfo.outputDir = traceOutputDirTemplate(testInfo);
         await use(testInfo);
      },
      { scope: 'test', auto: true },
   ],
   // eslint-disable-next-line no-empty-pattern
   findProductQueryMock: async ({}, use) => {
      await use(cloneDeep(findProductQueryMock));
   },
   getProductListMock,
   clientRequestHandler: createWorkerFixture(handlers),
   /**
    * The following fixtures are dependent on the customServer fixture. By being
    * dependent on the customServer fixture, Playwright will automatically
    * instantiate the customServer fixture for the worker running the test.
    * Therefore, we do not need to directly call the customServer fixture in the
    * test to ensure the custom server is booted.
    */
   serverRequestInterceptor: [
      async ({ customServer, productPage, partsPage }, use) => {
         productPage.updateBaseURL(`http://localhost:${customServer.port}`);
         partsPage.updateBaseURL(`http://localhost:${customServer.port}`);
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

test.beforeEach(async ({ context }) => {
   // Add dev-api-psk cookie to context so that we can make authenticated
   // requests to the dev API from the playwright tests in gh action runners.
   await context.addCookies([
      {
         name: 'dev-api-psk',
         value: process.env.DEV_API_AUTH_TOKEN || 'filler-token',
         path: '/',
         domain: '.cominor.com',
      },
   ]);
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

export { test, expect };
