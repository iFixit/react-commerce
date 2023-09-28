import { filterFalsyItems } from '@helpers/application-helpers';
import type { FaQsSectionFieldsFragment } from '@lib/strapi-sdk';
import { faqFromStrapi, FAQSchema } from '@models/components/faq';
import { z } from 'zod';

export type FAQsSection = z.infer<typeof FAQsSectionSchema>;

export const FAQsSectionSchema = z.object({
   type: z.literal('FAQs'),
   id: z.string(),
   title: z.string().nullable(),
   description: z.string().nullable(),
   faqs: z.array(FAQSchema),
});

export function faqsSectionFromStrapi(
   fragment: FaQsSectionFieldsFragment | null | undefined,
   sectionId: string
): FAQsSection | null {
   const strapiFaqs = fragment?.faqs?.data ?? [];
   const faqs = filterFalsyItems(strapiFaqs.map(faqFromStrapi));

   const title = fragment?.title ?? null;
   const description = fragment?.description ?? null;

   return {
      type: 'FAQs',
      id: sectionId,
      title,
      description,
      faqs,
   };
}
