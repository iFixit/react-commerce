import { createSectionId } from '@helpers/strapi-helpers';
import type { HeroSectionFieldsFragment } from '@lib/strapi-sdk';
import {
   callToActionFromStrapi,
   CallToActionSchema,
} from '@models/components/call-to-action';
import { imageFromStrapi, ImageSchema } from '@models/components/image';
import { z } from 'zod';

export type HeroSection = z.infer<typeof HeroSectionSchema>;

export const HeroSectionSchema = z.object({
   type: z.literal('Hero'),
   id: z.string(),
   title: z.string().nullable(),
   description: z.string().nullable(),
   image: ImageSchema.nullable(),
   callToAction: CallToActionSchema.nullable(),
});

export function heroSectionFromStrapi(
   fragment: HeroSectionFieldsFragment | null | undefined,
   _index: number
): HeroSection | null {
   const id = createSectionId(fragment);
   const title = fragment?.title ?? null;
   const description = fragment?.description ?? null;

   if (id == null) return null;

   return {
      type: 'Hero',
      id,
      title,
      description,
      image: imageFromStrapi(fragment?.image),
      callToAction: callToActionFromStrapi(fragment?.callToAction),
   };
}
