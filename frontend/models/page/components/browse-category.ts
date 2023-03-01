import { CategoryFieldsFragment } from '@lib/strapi-sdk';
import { ProductListType } from '@models/product-list';
import { getProductListType } from '@models/product-list/server';
import { ImageSchema, imageFromStrapi } from '@models/shared/components/image';
import { z } from 'zod';

export const BrowseCategorySchema = z.object({
   id: z.string(),
   type: z.nativeEnum(ProductListType),
   handle: z.string(),
   title: z.string(),
   deviceTitle: z.string().nullable(),
   metaDescription: z.string().nullable(),
   image: ImageSchema.nullable(),
});

export type BrowseCategory = z.infer<typeof BrowseCategorySchema>;

export function browseCategoryFromStrapi(
   fragment: CategoryFieldsFragment | null | undefined
): BrowseCategory | null {
   const id = fragment?.id;
   const attributes = fragment?.productList?.data?.attributes;
   if (id == null || attributes == null) {
      return null;
   }
   return {
      id,
      type: getProductListType(attributes.type),
      handle: attributes.handle,
      title: attributes.title,
      deviceTitle: attributes.deviceTitle ?? null,
      metaDescription: attributes.metaDescription ?? null,
      image: imageFromStrapi(attributes.image),
   };
}
