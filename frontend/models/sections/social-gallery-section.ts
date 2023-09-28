import { filterFalsyItems } from '@helpers/application-helpers';
import { createSectionId } from '@helpers/strapi-helpers';
import type { SocialGallerySectionFieldsFragment } from '@lib/strapi-sdk';
import {
   socialPostFromStrapi,
   SocialPostSchema,
} from '@models/components/social-post';
import { z } from 'zod';

export type SocialGallerySection = z.infer<typeof SocialGallerySectionSchema>;

export const SocialGallerySectionSchema = z.object({
   type: z.literal('SocialGallery'),
   id: z.string(),
   title: z.string().nullable(),
   description: z.string().nullable(),
   posts: z.array(SocialPostSchema),
});

export async function socialGallerySectionFromStrapi(
   fragment: SocialGallerySectionFieldsFragment | null | undefined,
   _index: number
): Promise<SocialGallerySection | null> {
   const id = createSectionId(fragment);

   if (id == null) return null;

   const posts = filterFalsyItems(
      fragment?.posts?.data.map(socialPostFromStrapi)
   );

   return {
      type: 'SocialGallery',
      id,
      title: fragment?.title ?? null,
      description: fragment?.description ?? null,
      posts,
   };
}
