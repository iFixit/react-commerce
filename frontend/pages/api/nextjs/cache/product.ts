import { Duration } from '@lib/duration';
import { withCache } from '@lib/swr-cache';
import { ProductRedirectSchema, ProductSchema } from '@models/product';
import { findProduct } from '@models/product/server';
import { z } from 'zod';

export type {
   Product,
   ProductVariant,
   ProductVariantImage,
} from '@models/product';

export default withCache({
   endpoint: 'api/nextjs/cache/product',
   statName: 'cache.findProduct',
   variablesSchema: z.object({
      handle: z.string(),
      storeCode: z.string(),
      ifixitOrigin: z.string(),
   }),
   valueSchema: z.union([ProductSchema, ProductRedirectSchema]).nullable(),
   async getFreshValue({ handle, storeCode, ifixitOrigin }) {
      return findProduct({
         handle,
         storeCode,
         ifixitOrigin,
      });
   },
   ttl: Duration(1).minute,
   staleWhileRevalidate: Duration(1).day,
   clientOptions: {
      commandTimeout: 1000,
   },
});
