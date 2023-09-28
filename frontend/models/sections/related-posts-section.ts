import type { ProductListRelatedPostsSectionFieldsFragment } from '@lib/strapi-sdk';
import { z } from 'zod';

export type RelatedPostsSection = z.infer<typeof RelatedPostsSectionSchema>;

export const RelatedPostsSectionSchema = z.object({
   type: z.literal('RelatedPosts'),
   id: z.string(),
   tags: z.string().nullable(),
});

export function relatedPostsSectionFromStrapi(
   fragment: ProductListRelatedPostsSectionFieldsFragment | null | undefined,
   sectionId: string
): RelatedPostsSection {
   return {
      type: 'RelatedPosts',
      id: sectionId,
      tags: fragment?.tags ?? null,
   };
}
