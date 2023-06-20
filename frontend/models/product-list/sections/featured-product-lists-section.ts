import { filterNullableItems } from '@ifixit/helpers';
import type { ProductListLinkedProductListSetSectionFieldsFragment } from '@lib/strapi-sdk';
import { z } from 'zod';
import {
   productListPreviewFromStrapi,
   ProductListPreviewSchema,
} from '../component/product-list-preview';

export type FeaturedProductListsSection = z.infer<
   typeof FeaturedProductListsSectionSchema
>;

export const FeaturedProductListsSectionSchema = z.object({
   type: z.literal('FeaturedProductLists'),
   id: z.string(),
   title: z.string(),
   productLists: z.array(ProductListPreviewSchema),
});

export function featuredProductListsSectionFromStrapi(
   fragment:
      | ProductListLinkedProductListSetSectionFieldsFragment
      | null
      | undefined,
   sectionId: string
): FeaturedProductListsSection {
   const productLists = filterNullableItems(
      fragment?.productLists?.data.map(({ attributes }) =>
         productListPreviewFromStrapi(attributes)
      )
   );
   return {
      type: 'FeaturedProductLists',
      id: sectionId,
      title: fragment?.title ?? '',
      productLists,
   };
}
