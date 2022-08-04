import '@strapi/strapi';

export default async ({ strapi }: { strapi: Strapi.Strapi }) => {
   const shouldSeed = process.env.SEED_DB === 'true';
   if (shouldSeed) {
      try {
         const seedService = strapi.plugin('addons').service('seed');
         await seedService.createAdminUser();
         await seedService.importContentTypes(
            process.env.IMPORT_FROM_STRAPI_ORIGIN
         );
      } catch (err) {
         strapi.log.error('💥 Error while seeding database');
         strapi.log.error(err.message);
      }
   }
};
