import type { ScrewdriverBitFieldsFragment } from '@lib/strapi-sdk';
import { z } from 'zod';
import {
   ScrewdriverBitTypeSchema,
   screwdriverBitTypeFromStrapiFragment,
} from './screwdriver-bit-type';

export type ScrewdriverBit = z.infer<typeof ScrewdriverBitSchema>;

export const ScrewdriverBitSchema = z.object({
   id: z.string(),
   type: ScrewdriverBitTypeSchema,
   size: z.string().nullable(),
});

export function screwdriverBitsFromStrapiFragment(
   fragment: ScrewdriverBitFieldsFragment | null | undefined
): ScrewdriverBit | null {
   const id = fragment?.id;
   const attributes = fragment?.attributes;
   const type = screwdriverBitTypeFromStrapiFragment(attributes?.type?.data);

   if (id == null || attributes == null || type == null) return null;

   return {
      id,
      type: type,
      size: attributes.size ?? null,
   };
}
