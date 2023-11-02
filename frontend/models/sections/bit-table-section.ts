import { filterFalsyItems } from '@helpers/application-helpers';
import type { BitTableSectionFieldsFragment } from '@lib/strapi-sdk';
import {
   ScrewDriverBitSchema,
   screwdriverBitsFromStrapiFragment,
} from '@models/components/screwdriver-bit';
import { z } from 'zod';

export type BitTableSection = z.infer<typeof BitTableSectionSchema>;

export const BitTableSectionSchema = z.object({
   type: z.literal('BitTable'),
   id: z.string(),
   title: z.string().nullable(),
   description: z.string().nullable(),
   bits: z.array(ScrewDriverBitSchema),
});

export function bitTableSectionFromStrapi(
   fragment: BitTableSectionFieldsFragment | null | undefined,
   sectionId: string
): BitTableSection | null {
   const bits = fragment?.bits?.data;

   if (fragment == null || bits == null) return null;

   const parsedBits = filterFalsyItems(
      bits.map((bit) => screwdriverBitsFromStrapiFragment(bit))
   );

   return {
      type: 'BitTable',
      id: sectionId,
      title: fragment.title ?? null,
      description: fragment.description ?? null,
      bits: parsedBits,
   };
}
