import { filterFalsyItems } from '@helpers/application-helpers';
import { createSectionId } from '@helpers/strapi-helpers';
import { BrowseSectionFieldsFragment } from '@lib/strapi-sdk';
import { imageFromStrapi, ImageSchema } from '@models/components/image';
import { z } from 'zod';
import {
   BrowseCategory,
   browseCategoryFromStrapi,
   BrowseCategorySchema,
} from '../components/browse-category';

export type BrowseSection = z.infer<typeof BrowseSectionSchema>;

export const BrowseSectionSchema = z.object({
   type: z.literal('Browse'),
   id: z.string(),
   title: z.string().nullable(),
   description: z.string().nullable(),
   image: ImageSchema.nullable(),
   categories: z.array(BrowseCategorySchema),
});

export function browseSectionFromStrapi(
   fragment: BrowseSectionFieldsFragment | null | undefined,
   _index: number
): BrowseSection | null {
   const id = createSectionId(fragment);
   const title = fragment?.title ?? null;
   const description = fragment?.description ?? null;
   const categories: BrowseCategory[] = filterFalsyItems(
      fragment?.categories?.map(browseCategoryFromStrapi)
   );

   if (id == null) return null;

   return {
      type: 'Browse',
      id,
      title,
      description,
      image: imageFromStrapi(fragment?.image),
      categories,
   };
}
