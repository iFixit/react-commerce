import { CategoryFieldsFragment } from '@lib/strapi-sdk';
import { imageFromStrapi, ImageSchema } from '@models/components/image';
import { ProductListType } from '@models/product-list';
import { productListTypeFromStrapi } from '@models/product-list/component/product-list-type.server';
import { z } from 'zod';

export const BrowseCategorySchema = z.object({
   id: z.string(),
   type: z.nativeEnum(ProductListType),
   handle: z.string(),
   title: z.string(),
   deviceTitle: z.string().nullable(),
   description: z.string().nullable(),
   image: ImageSchema.nullable(),
});

export type BrowseCategory = z.infer<typeof BrowseCategorySchema>;

export function browseCategoryFromStrapi(
   fragment: CategoryFieldsFragment | null | undefined
): BrowseCategory | null {
   const id = fragment?.id;
   const attributes = fragment?.productList?.data?.attributes;
   const description = fragment?.description ?? null;

   if (id == null || attributes == null) {
      return null;
   }
   return {
      id,
      type: productListTypeFromStrapi(attributes.type),
      handle: attributes.handle,
      title: attributes.title,
      deviceTitle: attributes.deviceTitle ?? null,
      description,
      image: imageFromStrapi(attributes.image),
   };
}
