import {
   ALGOLIA_API_KEY,
   ALGOLIA_APP_ID,
   ALGOLIA_PRODUCT_INDEX_NAME,
} from '@config/env';
import { filterFalsyItems } from '@helpers/application-helpers';
import { computeProductListAlgoliaFilterPreset } from '@helpers/product-list-helpers';
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

const BackgroundColorSchema = z.enum(['transparent', 'white']);

export const FeaturedProductsSectionSchema = z.object({
   type: z.literal('FeaturedProducts'),
   id: z.string(),
   title: z.string().nullable(),
   description: z.string().nullable(),
   background: BackgroundColorSchema.nullable(),
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

   const productList = fragment?.productList?.data?.attributes ?? null;

   const filters = computeProductListAlgoliaFilterPreset({
      deviceTitle: productList?.deviceTitle ?? null,
      filters: productList?.filters ?? null,
   });

   const response = await searchIndex.search('', {
      hitsPerPage: 12,
      filters,
   });

   const products = filterFalsyItems(
      response.hits.map(productPreviewFromAlgoliaHit)
   );

   const backgroundValidation = BackgroundColorSchema.safeParse(
      fragment?.background
   );

   return {
      type: 'FeaturedProducts',
      id,
      title: fragment?.title ?? null,
      description: fragment?.description ?? null,
      background: backgroundValidation.success
         ? backgroundValidation.data
         : null,
      products,
   };
}
