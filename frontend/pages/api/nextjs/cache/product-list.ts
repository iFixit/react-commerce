import { Duration } from '@lib/duration';
import { ProductListFiltersInputSchema } from '@lib/strapi-sdk';
import { withCache } from '@lib/swr-cache';
import { findProductList } from '@models/product-list/server';
import { ProductListSchema } from '@models/product-list/types';
import { z } from 'zod';

export default withCache({
   endpoint: 'api/nextjs/cache/product-list',
   statName: 'cache.findProductList',
   variablesSchema: z.object({
      filters: ProductListFiltersInputSchema(),
      ifixitOrigin: z.string(),
   }),
   valueSchema: ProductListSchema.nullable(),
   async getFreshValue({ filters, ifixitOrigin }) {
      return findProductList(filters, ifixitOrigin);
   },
   ttl: Duration(1).hour,
   staleWhileRevalidate: Duration(1).day,
   clientOptions: {
      commandTimeout: 1000,
   },
});
