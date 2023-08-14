import type { PlacementFieldsFragment } from '@lib/strapi-sdk';
import { z } from 'zod';

export type SectionPlacement = z.infer<typeof SectionPlacementSchema>;

export const SectionPlacementSchema = z.object({
   showInProductLists: z.enum([
      'only selected',
      'selected and descendants',
      'only descendants',
      'none',
   ]),
});

export function getPlacementFromStrapi(
   strapiPlacement?: PlacementFieldsFragment | null
): SectionPlacement | null {
   if (strapiPlacement == null) return null;
   const placement = {
      showInProductLists: strapiPlacement.showInProductListPages,
   };
   const validatedPlacement = SectionPlacementSchema.safeParse(placement);
   if (!validatedPlacement.success) return null;

   return validatedPlacement.data;
}
