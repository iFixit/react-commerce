import { parseJSONMetafield } from '@helpers/storefront-helpers';
import { printZodError } from '@helpers/zod-helpers';
import { z } from 'zod';

export type ProductEnabledDomain = z.infer<typeof ProductEnabledDomainSchema>;

export const ProductEnabledDomainSchema = z.object({
   code: z.string(),
   domain: z.string().url(),
   locales: z.string().array(),
});

export function productEnabledDomainsFromMetafield(
   value: string | null | undefined
): ProductEnabledDomain[] | null {
   const rawJson = parseJSONMetafield(value);
   if (rawJson == null) {
      return null;
   }
   const result = z.array(ProductEnabledDomainSchema).safeParse(rawJson);
   if (result.success) {
      return result.data;
   }
   printZodError(result.error, 'enabled domains metafield');
   return null;
}
