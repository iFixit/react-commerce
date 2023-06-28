import type { Strapi } from '@strapi/strapi';
import { getAddonsService } from './services';

export default async ({ strapi }: { strapi: Strapi }) => {
   const isSeedingEnabled = process.env.SEED_DB === 'true';
   const shouldSeed = isSeedingEnabled;

   if (shouldSeed) {
      try {
         const seedService = getAddonsService(strapi, 'seed');
         await seedService.createAdminUser();
         await seedService.importContentTypes({
            canDeleteExistingContent: false,
         });
      } catch (err: any) {
         strapi.log.error('💥 Error while seeding database');
         strapi.log.error(err.message);
      }
   }
};
