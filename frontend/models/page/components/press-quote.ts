import type { PressQuoteFieldsFragment } from '@lib/strapi-sdk';
import { companyFromStrapi, CompanySchema } from '@models/components/company';
import { z } from 'zod';

export type PressQuote = z.infer<typeof PressQuoteSchema>;

export const PressQuoteSchema = z.object({
   id: z.string(),
   company: CompanySchema,
   text: z.string(),
});

export function pressQuoteFromStrapi(
   fragment: PressQuoteFieldsFragment | null | undefined
): PressQuote | null {
   const id = fragment?.id;
   const company = companyFromStrapi(fragment?.company?.data);
   const text = fragment?.text;

   if (id == null || company == null || text == null) return null;

   return { id, company, text };
}
