import {
   PlaywrightTestConfig,
   PlaywrightTestOptions,
   PlaywrightWorkerOptions,
   Project,
   devices,
} from '@playwright/test';
import * as dotenv from 'dotenv';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
dotenv.config({ path: '.env.test' });
dotenv.config({ path: '.env.local' });

const targetUrl = new URL(process.env.NEXT_PUBLIC_IFIXIT_ORIGIN || '');

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
   workers: process.env.CI ? '100%' : '25%',
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
      generateBrowserConfig({
         name: 'Desktop Chrome',
         use: {
            ...devices['Desktop Chrome'],
         },
      }),
      /* Test against mobile viewports. */
      generateBrowserConfig({
         name: 'Mobile Chrome',
         use: {
            ...devices['Pixel 5'],
         },
      }),
      generateBrowserConfig({
         name: 'Tablet Chrome',
         use: {
            ...devices['Galaxy Tab S4'],
         },
      }),
   ],

   /* Folder for test artifacts such as screenshots, videos, traces, etc. */
   outputDir: 'tests/playwright/test-results/artifacts/',

   /* Run your local dev server before starting the tests */
   webServer: {
      cwd: process.env.CI ? './' : '../',
      command: process.env.CI ? 'pnpm run start' : 'pnpm run dev',
      port: 3000,
      timeout: 120 * 1000,
      /* Reuse the same server if on local dev */
      reuseExistingServer: !process.env.CI,
   },
};

function generateBrowserConfig(
   config: Project<PlaywrightTestOptions, PlaywrightWorkerOptions>
): Project<PlaywrightTestOptions, PlaywrightWorkerOptions> {
   return {
      ...config,
      use: {
         ...config.use,
         storageState: {
            cookies: [
               {
                  name: 'dev-api-psk',
                  value: process.env.DEV_API_AUTH_TOKEN || 'filler-token',
                  sameSite: 'None',
                  expires:
                     Math.floor(Date.now().valueOf() / 1000) +
                     60 * 60 * 24 * 365,
                  httpOnly: false,
                  domain: targetUrl.hostname,
                  path: targetUrl.pathname,
                  secure: false,
               },
            ],
            origins: [],
         },
      },
   };
}

export default config;
