import type { SocialPostFieldsFragment } from '@lib/strapi-sdk';
import { z } from 'zod';
import { imageFromStrapi, ImageSchema } from './image';

export const SocialPostSchema = z.object({
   author: z.string(),
   url: z.string().nullable(),
   image: ImageSchema,
});

export type SocialPost = z.infer<typeof SocialPostSchema>;

export function socialPostFromStrapi(
   fragment: SocialPostFieldsFragment | null | undefined
): SocialPost | null {
   const author = fragment?.attributes?.author;
   const image = imageFromStrapi(fragment?.attributes?.image);
   const url = fragment?.attributes?.url ?? null;

   if (author == null || image == null) return null;

   return {
      author,
      image,
      url,
   };
}
