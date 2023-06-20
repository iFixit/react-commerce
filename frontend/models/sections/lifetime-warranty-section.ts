import type { ProductListBannerSectionFieldsFragment } from '@lib/strapi-sdk';
import { CallToActionSchema } from '@models/components/call-to-action';
import { z } from 'zod';

export type LifetimeWarrantySection = z.infer<
   typeof LifetimeWarrantySectionSchema
>;

export const LifetimeWarrantySectionSchema = z.object({
   type: z.literal('LifetimeWarranty'),
   id: z.string(),
   title: z.string().nullable(),
   description: z.string().nullable(),
   callToAction: CallToActionSchema.nullable(),
});

export function lifetimeWarrantySectionFromStrapi(
   fragment: ProductListBannerSectionFieldsFragment | null | undefined,
   sectionId: string
): LifetimeWarrantySection | null {
   const title = fragment?.title ?? null;
   const description = fragment?.description ?? null;
   const callToActionTitle = fragment?.callToActionLabel ?? null;
   const callToActionUrl = fragment?.url ?? null;

   return {
      type: 'LifetimeWarranty',
      id: sectionId,
      title,
      description,
      callToAction:
         callToActionTitle && callToActionUrl
            ? { title: callToActionTitle, url: callToActionUrl }
            : null,
   };
}
