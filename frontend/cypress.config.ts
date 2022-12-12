import { defineConfig } from 'cypress';

export default defineConfig({
   fixturesFolder: 'tests/cypress/fixtures',
   screenshotsFolder: 'tests/cypress/screenshots',
   videosFolder: 'tests/cypress/videos',
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
      specPattern: 'tests/cypress/integration/**/*.cy.{js,jsx,ts,tsx}',
      supportFile: 'tests/cypress/support/index.ts',
      // https://docs.cypress.io/guides/references/configuration#e2e
      experimentalSessionAndOrigin: true,
   },
});
