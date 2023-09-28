import type { Strapi } from '@strapi/strapi';
import type { Context } from 'koa';
import z from 'zod';
import { getAddonsService } from '../services';

const FindManyContentTypesArgsSchema = z.object({
   kind: z.enum(['collectionType', 'singleType']),
});

export default ({ strapi }: { strapi: Strapi }) => ({
   async findManyContentTypes(ctx: Context) {
      const contentTypesService = getAddonsService(strapi, 'contentTypes');
      let result = contentTypesService.findManyContentTypes();
      const validatedQuery = FindManyContentTypesArgsSchema.safeParse(
         ctx.query
      );
      if (validatedQuery.success) {
         result = result.filter(
            (schema) => schema.kind === validatedQuery.data.kind
         );
      }
      ctx.body = result;
   },
});
