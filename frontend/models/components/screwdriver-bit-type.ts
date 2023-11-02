import type { ScrewdriverBitTypeFieldsFragment } from '@lib/strapi-sdk';
import { z } from 'zod';
import { ImageSchema, imageFromStrapi } from './image';

export type ScrewdriverBitType = z.infer<typeof ScrewdriverBitTypeSchema>;

export const ScrewdriverBitTypeSchema = z.object({
   id: z.string(),
   icon: ImageSchema.nullable(),
   name: z.string(),
   driverSize: z.string(),
});

export function screwdriverBitTypeFromStrapiFragment(
   fragment: ScrewdriverBitTypeFieldsFragment | null | undefined
): ScrewdriverBitType | null {
   const id = fragment?.id;
   const attributes = fragment?.attributes;

   if (id == null || attributes == null) return null;

   return {
      id,
      icon: imageFromStrapi(attributes?.icon),
      name: attributes.name,
      driverSize: attributes.driverSize,
   };
}
