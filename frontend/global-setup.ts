import { FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
   const playwrightBaseUrl = config.projects[0].use.baseURL!;
   process.env.PLAYWRIGHT_TEST_BASE_URL = playwrightBaseUrl;
}

export default globalSetup;
