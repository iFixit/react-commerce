import type { ImageFieldsFragment } from '@lib/strapi-sdk';
import { z } from 'zod';

export const ImageSchema = z.object({
   id: z.string().nullable().optional(),
   altText: z.string().nullable().optional(),
   height: z.number().nullable().optional(),
   width: z.number().nullable().optional(),
   url: z.string(),
});

export type Image = z.infer<typeof ImageSchema>;

export function imageFromStrapi(
   imageFragment: ImageFieldsFragment | null | undefined
): Image | null {
   const attributes = imageFragment?.data?.attributes;
   if (attributes == null) {
      return null;
   }
   return {
      url: attributes.url,
      altText: attributes.alternativeText,
   };
}
