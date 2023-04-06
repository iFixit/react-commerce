import type { BannerFieldsFragment } from '@lib/strapi-sdk';
import { z } from 'zod';
import { callToActionFromStrapi, CallToActionSchema } from './call-to-action';
import { imageFromStrapi, ImageSchema } from './image';

export type Banner = z.infer<typeof BannerSchema>;

export const BannerSchema = z.object({
   id: z.string(),
   label: z.string().nullable(),
   title: z.string().nullable(),
   description: z.string().nullable(),
   image: ImageSchema.nullable(),
   callToAction: CallToActionSchema.nullable(),
});

export function bannerFromStrapiFragment(
   fragment: BannerFieldsFragment | null | undefined
): Banner | null {
   const id = fragment?.id;
   const attributes = fragment?.attributes;

   if (id == null || attributes == null) return null;

   return {
      id,
      label: attributes.label ?? null,
      title: attributes.title ?? null,
      description: attributes.description ?? null,
      image: imageFromStrapi(attributes?.image),
      callToAction: callToActionFromStrapi(attributes?.callToAction),
   };
}
