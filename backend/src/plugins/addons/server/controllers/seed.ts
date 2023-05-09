import type { Strapi } from '@strapi/strapi';
import { getAddonsService } from '../services';

export default ({ strapi }: { strapi: Strapi }) => ({
   async importContentTypes(ctx) {
      const strapiOrigin = ctx.request.body?.strapiOrigin;
      if (typeof strapiOrigin === 'string') {
         const seedService = getAddonsService(strapi, 'seed');
         const result = await seedService.importContentTypes({
            strapiOrigin,
            canDeleteExistingContent: true,
         });
         ctx.body = result;
      } else {
         ctx.body = { error: 'invalid strapi origin' };
      }
   },
   async backup(ctx: any) {
      const seedService = getAddonsService(strapi, 'seed');
      try {
         const result = await seedService.exportBackup();
         ctx.body = result;
      } catch (error) {
         ctx.status = 500;
         ctx.body = error.message;
      }
   },
   async import(ctx: any) {
      const seedService = getAddonsService(strapi, 'seed');
      let strapiOrigin: string;
      try {
         strapiOrigin = requireStrapiDomain(ctx.request.body?.strapiOrigin);
      } catch (error) {
         ctx.status = 400;
         ctx.body = error.message;
         return;
      }
      try {
         const backup = await seedService.downloadBackup({
            strapiOrigin,
         });
         await seedService.importBackup(backup);
         ctx.body = 'ok';
      } catch (error) {
         ctx.status = 500;
         ctx.body = error.message;
      }
   },
});

const URL_REGEX = /^https?:\/\//i;

function requireStrapiDomain(value: unknown): string {
   if (typeof value !== 'string' || value.trim().length === 0) {
      throw new Error('Strapi domain is required');
   }
   let domain = value.trim();
   const url = URL_REGEX.test(domain) ? domain : `https://${domain}`;

   return url;
}
