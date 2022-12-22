import type { Locator, PlaywrightTestConfig } from '@playwright/test';
import { expect, devices } from '@playwright/test';
import { format } from 'util';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
   testDir: './tests/playwright',
   /* Maximum time one test can run for. */
   timeout: 60 * 1000,
   expect: {
      /**
       * Maximum time expect() should wait for the condition to be met.
       * For example in `await expect(locator).toHaveText();`
       */
      timeout: 10000,
   },
   /* Run tests in files in parallel */
   fullyParallel: true,
   /* Fail the build on CI if you accidentally left test.only in the source code. */
   forbidOnly: !!process.env.CI,
   /* Retry on CI only */
   retries: process.env.CI ? 2 : 0,
   /* Opt out of parallel tests on CI. */
   workers: process.env.CI ? '100%' : undefined,
   /* Reporter to use. See https://playwright.dev/docs/test-reporters */
   reporter: [
      process.env.CI
         ? ['list']
         : [
              'html',
              {
                 open: 'never', // will not try to automatically open the report in the browser if test fails
                 outputFolder: 'tests/playwright/test-results/reports/',
              },
           ],
   ],
   /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
   use: {
      /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
      actionTimeout: 0,
      /* Base URL to use in actions like `await page.goto('/')`. */
      baseURL: 'http://localhost:3000',

      /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
      trace: 'on-first-retry',

      viewport: { width: 1400, height: 1000 },
      launchOptions: {
         slowMo: 1000,
      },
   },

   /* Configure projects for major browsers */
   projects: [
      {
         name: 'chromium',
         use: {
            ...devices['Desktop Chrome'],
         },
      },

      {
         name: 'firefox',
         use: {
            ...devices['Desktop Firefox'],
         },
      },

      // We need to enable cross-site tracking for Safari to work locally.
      // {
      //    name: 'webkit',
      //    use: {
      //       ...devices['Desktop Safari'],
      //    },
      // },

      /* Test against mobile viewports. */
      // {
      //   name: 'Mobile Chrome',
      //   use: {
      //     ...devices['Pixel 5'],
      //   },
      // },
      // {
      //   name: 'Mobile Safari',
      //   use: {
      //     ...devices['iPhone 12'],
      //   },
      // },

      /* Test against branded browsers. */
      // {
      //   name: 'Microsoft Edge',
      //   use: {
      //     channel: 'msedge',
      //   },
      // },
      // {
      //   name: 'Google Chrome',
      //   use: {
      //     channel: 'chrome',
      //   },
      // },
   ],

   /* Folder for test artifacts such as screenshots, videos, traces, etc. */
   outputDir: 'tests/playwright/test-results/artifacts/',

   /* Run your local dev server before starting the tests */
   webServer: {
      cwd: process.env.CI ? './' : '../',
      command: process.env.CI
         ? 'pnpm run build && pnpm run start'
         : 'pnpm run dev',
      port: 3000,
      timeout: 120 * 1000,
      /* Reuse the same server if on local dev */
      reuseExistingServer: !process.env.CI,
   },
};

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

export default config;
