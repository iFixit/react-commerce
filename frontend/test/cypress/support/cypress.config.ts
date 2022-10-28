import { defineConfig } from 'cypress';

export default defineConfig({
   e2e: {
      // https://docs.cypress.io/guides/references/configuration#e2e
      experimentalSessionAndOrigin: true,
   },
});
