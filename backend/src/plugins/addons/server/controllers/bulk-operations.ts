import type { Strapi } from '@strapi/strapi';
import { getAddonsService } from '../services';
import { ExportCSVArgsSchema } from '../services/bulk-operations/export-csv';
import { ImportCSVArgsSchema } from '../services/bulk-operations/import-csv';
import type { Context } from 'koa';

export default ({ strapi }: { strapi: Strapi }) => ({
   async exportCSV(ctx: Context) {
      const bulkOperationsService = getAddonsService(strapi, 'bulkOperations');
      const validation = ExportCSVArgsSchema.safeParse(ctx.request.body);

      if (!validation.success) {
         return ctx.throw(400, validation.error);
      }
      const result = await bulkOperationsService.exportCSV(validation.data);
      ctx.body = result;
   },
   async importCSV(ctx: Context) {
      const bulkOperationsService = getAddonsService(strapi, 'bulkOperations');
      const validation = ImportCSVArgsSchema.safeParse(ctx.request.body);

      if (!validation.success) {
         return ctx.throw(400, validation.error);
      }

      const result = await bulkOperationsService.importCSV(validation.data);
      ctx.body = result;
   },
});
