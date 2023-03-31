import { parseJSONMetafield } from '@helpers/storefront-helpers';
import { printZodError } from '@helpers/zod-helpers';
import { z } from 'zod';

export type ProductOemPartnership = z.infer<typeof ProductOemPartnershipSchema>;

export const ProductOemPartnershipSchema = z.object({
   text: z.string(),
   code: z.string(),
   url: z.string().optional().nullable(),
});

export function productOemPartnershipFromMetafield(
   value: string | null | undefined
): ProductOemPartnership | null {
   const rawJson = parseJSONMetafield(value);
   if (rawJson == null) {
      return null;
   }
   const result = ProductOemPartnershipSchema.safeParse(rawJson);
   if (result.success) {
      return result.data;
   }
   printZodError(result.error, 'product oem partnership metafield');
   return null;
}
