import type { QuoteCardFieldsFragment } from '@lib/strapi-sdk';
import { z } from 'zod';
import { personFromStrapiFragment, PersonSchema } from './person';

export type QuoteCard = z.infer<typeof QuoteCardSchema>;

export const QuoteCardSchema = z.object({
   id: z.string(),
   text: z.string(),
   author: PersonSchema.nullable(),
});

export function quoteCardFromStrapiFragment(
   fragment: QuoteCardFieldsFragment | null | undefined
): QuoteCard | null {
   const id = fragment?.id;
   const text = fragment?.text ?? null;

   if (id == null || text == null) return null;

   return {
      id,
      text,
      author: personFromStrapiFragment(fragment?.author),
   };
}
