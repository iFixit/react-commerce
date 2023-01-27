import { Duration } from '@lib/duration';
import { withCache } from '@lib/swr-cache';
import { ProductSchema } from '@models/product/schema';
import { findProduct } from '@models/product/server';
import { z } from 'zod';

export type {
   Product,
   ProductImage,
   ProductVariant,
   ProductVariantImage,
} from '@models/product/schema';

export default withCache({
   endpoint: 'api/nextjs/cache/product',
   statName: 'cache.findProduct',
   variablesSchema: z.object({
      handle: z.string(),
      storeCode: z.string(),
   }),
   valueSchema: ProductSchema.nullable(),
   async getFreshValue({ handle, storeCode }) {
      return findProduct({
         handle,
         storeCode,
      });
   },
   ttl: Duration(1).minute,
   staleWhileRevalidate: Duration(1).day,
   log: true,
});
