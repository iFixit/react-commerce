import type { Strapi } from '@strapi/strapi';
import { getAddonsService } from './services';

const FALLBACK_STRAPI_ORIGIN = 'https://main.govinor.com';

export default async ({ strapi }: { strapi: Strapi }) => {
   const isSeedingEnabled = process.env.SEED_DB === 'true';
   const shouldSeed = isSeedingEnabled;

   if (shouldSeed) {
      try {
         const seedService = getAddonsService(strapi, 'seed');
         await seedService.createAdminUser();
         await seedService.downloadBackup({
            strapiOrigin: FALLBACK_STRAPI_ORIGIN,
         });
         backgroundImport({ strapi })
            .then((logs) => {
               strapi.log.info('🌱 Seeding completed!');
               if (logs.length > 0) {
                  strapi.log.info(`🌱 Seeding logs:\n${logs}`);
               }
            })
            .catch((error) => {
               strapi.log.error('💥 Error while importing from backup');
               strapi.log.error(error.message);
            });
      } catch (err: any) {
         strapi.log.error('💥 Error while seeding database');
         strapi.log.error(err.message);
      }
   }
};

interface BackgroundImportInput {
   strapi: Strapi;
}

async function backgroundImport({ strapi }: BackgroundImportInput) {
   // Wait for the Strapi server to start, since we need it for the Strapi import
   // tool to work.
   await delay(5000);
   const seedService = getAddonsService(strapi, 'seed');
   return seedService.importBackup();
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
