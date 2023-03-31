import { parseJSONMetafield } from '@helpers/storefront-helpers';
import { filterNullableItems } from '@ifixit/helpers';
import { z } from 'zod';

export type FAQ = z.infer<typeof FAQSchema>;

export const FAQSchema = z.object({
   question: z.string(),
   answer: z.string(),
});

export function faqsFromMetafield(value: string | null | undefined): FAQ[] {
   const json = parseJSONMetafield(value);
   if (!Array.isArray(json)) {
      return [];
   }
   return filterNullableItems(
      json.map((faq) => {
         const question = faq?.question;
         const answer = faq?.answer;
         if (typeof question !== 'string' || typeof answer !== 'string') {
            return null;
         }
         return {
            question,
            answer,
         };
      })
   );
}
