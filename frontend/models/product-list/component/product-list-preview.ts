import type { ProductListPreviewFieldsFragment } from '@lib/strapi-sdk';
import { imageFromStrapi, ImageSchema } from '@models/components/image';
import { z } from 'zod';
import { ProductListTypeSchema } from './product-list-type';
import { productListTypeFromStrapi } from './product-list-type.server';

export type ProductListPreview = z.infer<typeof ProductListPreviewSchema>;

export const ProductListPreviewSchema = z.object({
   handle: z.string(),
   title: z.string(),
   type: ProductListTypeSchema,
   deviceTitle: z.string().nullable(),
   description: z.string(),
   image: ImageSchema.nullable(),
   filters: z.string().nullable(),
});

export function productListPreviewFromStrapi(
   fragment: ProductListPreviewFieldsFragment | null | undefined
): ProductListPreview | null {
   if (fragment == null) return null;

   return {
      handle: fragment.handle,
      title: fragment.title,
      type: productListTypeFromStrapi(fragment.type),
      deviceTitle: fragment.deviceTitle ?? null,
      description: fragment.description,
      image: imageFromStrapi(fragment.image),
      filters: fragment.filters ?? null,
   };
}
