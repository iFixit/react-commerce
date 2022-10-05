import { defineConfig } from 'cypress';

export default defineConfig({
   fixturesFolder: 'test/cypress/fixtures',
   screenshotsFolder: 'test/cypress/screenshots',
   videosFolder: 'test/cypress/videos',
   video: false,
   retries: {
      runMode: 2,
   },
   e2e: {
      setupNodeEvents(on, config) {
         on('before:browser:launch', (browser, launchOptions) => {
            if (browser.family === 'chromium' && browser.name !== 'electron') {
               launchOptions.args.push('--window-size=1400,1000');
               return launchOptions;
            }

            if (browser.name === 'electron') {
               launchOptions.preferences.width = 1400;
               launchOptions.preferences.height = 1000;
               return launchOptions;
            }
         });
      },
      baseUrl: 'http://localhost:3000',
      specPattern: 'test/cypress/integration/**/*.cy.{js,jsx,ts,tsx}',
      supportFile: 'test/cypress/support/index.ts',
   },
});
