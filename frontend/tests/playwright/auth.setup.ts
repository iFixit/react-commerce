// Pulled from docs: https://playwright.dev/docs/auth#basic-shared-account-in-all-tests

import { test as setup, expect } from '@playwright/test';

import * as dotenv from 'dotenv';
const dotenvConfig = {
   path: __dirname + '/../../.env.local',
};

dotenv.config(dotenvConfig);

const authFile = __dirname + '/.auth/user.json';

setup('authenticate', async ({ context }) => {
   expect(process.env.DEV_API_AUTH_TOKEN).toBeTruthy();
   if (process.env.DEV_API_AUTH_TOKEN) {
      await context.addCookies([
         {
            name: 'dev-api-psk',
            value: process.env.DEV_API_AUTH_TOKEN,
            url: process.env.NEXT_PUBLIC_IFIXIT_ORIGIN,
            sameSite: 'None',
            expires:
               Math.floor(Date.now().valueOf() / 1000) + 60 * 60 * 24 * 365,
         },
      ]);
   }
   await context.storageState({ path: authFile });
});
