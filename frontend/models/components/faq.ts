import { isPresent } from '@ifixit/helpers';
import type { FaqFieldsFragment } from '@lib/strapi-sdk';
import { z } from 'zod';

export type FAQ = z.infer<typeof FAQSchema>;

export const FAQSchema = z.object({
   id: z.string(),
   question: z.string(),
   answer: z.string(),
   category: z.string().nullable(),
   itemType: z.string().nullable(),
   priority: z.number(),
});

export function faqFromStrapi(
   fragment: FaqFieldsFragment | null | undefined
): FAQ | null {
   const id = fragment?.id;
   const question = fragment?.attributes?.question;
   const answer = fragment?.attributes?.answer;

   if (id == null || !isPresent(question) || !isPresent(answer)) return null;

   const category = fragment?.attributes?.category;
   const itemType = fragment?.attributes?.item_type;

   return {
      id,
      category: isPresent(category) ? category : null,
      itemType: isPresent(itemType) ? itemType : null,
      priority: fragment?.attributes?.priority ?? 0,
      question,
      answer,
   };
}

// This sorts FAQs by priority, from highest to lowest.
export function compareFAQs(a: FAQ, b: FAQ): number {
   return b.priority - a.priority;
}
