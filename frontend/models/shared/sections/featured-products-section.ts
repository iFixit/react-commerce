import {
   ALGOLIA_API_KEY,
   ALGOLIA_APP_ID,
   ALGOLIA_PRODUCT_INDEX_NAME,
} from '@config/env';
import { filterFalsyItems } from '@helpers/application-helpers';
import { createSectionId } from '@helpers/strapi-helpers';
import { FeaturedProductsSectionFieldsFragment } from '@lib/strapi-sdk';
import algoliasearch from 'algoliasearch/lite';
import { z } from 'zod';
import {
   productPreviewFromAlgoliaHit,
   ProductPreviewSchema,
} from '../components/product-preview';

export type FeaturedProductsSection = z.infer<
   typeof FeaturedProductsSectionSchema
>;

export const FeaturedProductsSectionSchema = z.object({
   type: z.literal('FeaturedProducts'),
   id: z.string(),
   title: z.string().nullable(),
   description: z.string().nullable(),
   products: z.array(ProductPreviewSchema),
});

const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);
const searchIndex = client.initIndex(ALGOLIA_PRODUCT_INDEX_NAME);

export async function featuredProductsSectionFromStrapi(
   fragment: FeaturedProductsSectionFieldsFragment | null | undefined,
   index: number
): Promise<FeaturedProductsSection | null> {
   const id = createSectionId(fragment, index);

   if (id == null) return null;

   const response = await searchIndex.search('', {
      hitsPerPage: 12,
   });

   const products = filterFalsyItems(
      response.hits.map(productPreviewFromAlgoliaHit)
   );

   return {
      type: 'FeaturedProducts',
      id,
      title: fragment?.title ?? null,
      description: fragment?.description ?? null,
      products,
   };
}
