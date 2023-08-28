import { isPresent } from '@ifixit/helpers';
import type { FaqFieldsFragment } from '@lib/strapi-sdk';
import { z } from 'zod';

export type FAQ = z.infer<typeof FAQSchema>;

export const FAQSchema = z.object({
   category: z.string().nullable(),
   question: z.string(),
   answer: z.string(),
});

export function faqFromStrapi(
   fragment: FaqFieldsFragment | null | undefined
): FAQ | null {
   const question = fragment?.attributes?.question;
   const answer = fragment?.attributes?.answer;

   if (!isPresent(question) || !isPresent(answer)) return null;

   const category = fragment?.attributes?.category;
   return {
      category: isPresent(category) ? category : null,
      question,
      answer,
   };
}
