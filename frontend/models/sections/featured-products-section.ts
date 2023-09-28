import { filterFalsyItems } from '@helpers/application-helpers';
import { computeProductListAlgoliaFilterPreset } from '@helpers/product-list-helpers';
import type { FindProductQuery } from '@lib/shopify-storefront-sdk';
import type { FeaturedProductsSectionFieldsFragment } from '@lib/strapi-sdk';
import {
   getProductPreviewsFromAlgolia,
   productPreviewFromShopify,
} from '@models/components/product-preview';
import shuffle from 'lodash/shuffle';
import { z } from 'zod';
import {
   ProductPreview,
   ProductPreviewSchema,
} from '../components/product-preview';

export type FeaturedProductsSection = z.infer<
   typeof FeaturedProductsSectionSchema
>;

export type BackgroundColor = z.infer<typeof BackgroundColorSchema>;

const BackgroundColorSchema = z.enum(['transparent', 'white']);

export const FeaturedProductsSectionSchema = z.object({
   type: z.literal('FeaturedProducts'),
   id: z.string(),
   title: z.string().nullable(),
   description: z.string().nullable(),
   background: BackgroundColorSchema.nullable(),
   products: z.array(ProductPreviewSchema),
});

interface FeaturedProductsSectionArgs {
   strapiSection: FeaturedProductsSectionFieldsFragment | null | undefined;
   sectionId: string;
   fallbackProducts?: ProductPreview[];
}

export async function featuredProductsSectionFromStrapi({
   strapiSection,
   sectionId,
   fallbackProducts = [],
}: FeaturedProductsSectionArgs): Promise<FeaturedProductsSection | null> {
   if (sectionId == null) return null;

   const productList = strapiSection?.productList?.data?.attributes ?? null;
   let products: ProductPreview[] = [];

   if (productList) {
      const filters = computeProductListAlgoliaFilterPreset({
         deviceTitle: productList.deviceTitle ?? null,
         filters: productList.filters ?? null,
      });

      try {
         products = await getProductPreviewsFromAlgolia({
            filters,
            hitsPerPage: 12,
         });
      } catch (e) {
         console.error('Error getting featured products from Algolia', e);
         products = fallbackProducts;
      }
   } else {
      products = fallbackProducts;
   }

   const backgroundValidation = BackgroundColorSchema.safeParse(
      strapiSection?.background
   );

   return {
      type: 'FeaturedProducts',
      id: sectionId,
      title: strapiSection?.title ?? null,
      description: strapiSection?.description ?? null,
      background: backgroundValidation.success
         ? backgroundValidation.data
         : null,
      products,
   };
}

const MAX_FEATURED_VARIANTS = 6;

type QueryProduct = NonNullable<FindProductQuery['product']>;

export function featuredProductPreviewsFromShopifyProduct(
   shopifyProduct: QueryProduct
): ProductPreview[] {
   const variants =
      shopifyProduct.featuredProductVariants?.references?.nodes.map((node) => {
         if (node.__typename !== 'ProductVariant') {
            return null;
         }
         return productPreviewFromShopify(node);
      }) ?? [];
   const featuredVariants = filterFalsyItems(variants);
   return shuffle(featuredVariants).slice(0, MAX_FEATURED_VARIANTS);
}
