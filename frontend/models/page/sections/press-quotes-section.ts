import { filterFalsyItems } from '@helpers/application-helpers';
import { createSectionId } from '@helpers/strapi-helpers';
import type { PressQuotesSectionFieldsFragment } from '@lib/strapi-sdk';
import {
   callToActionFromStrapi,
   CallToActionSchema,
} from '@models/components/call-to-action';
import { z } from 'zod';
import {
   pressQuoteFromStrapi,
   PressQuoteSchema,
} from '../components/press-quote';

export type PressQuotesSection = z.infer<typeof PressQuotesSectionSchema>;

export const PressQuotesSectionSchema = z.object({
   type: z.literal('PressQuotes'),
   id: z.string(),
   title: z.string().nullable(),
   description: z.string().nullable(),
   quotes: z.array(PressQuoteSchema),
   callToAction: CallToActionSchema.nullable(),
});

export function pressQuotesSectionFromStrapi(
   fragment: PressQuotesSectionFieldsFragment | null | undefined,
   _index: number
): PressQuotesSection | null {
   const id = createSectionId(fragment);
   const title = fragment?.title;
   const description = fragment?.description;
   const quotes = filterFalsyItems(fragment?.quotes?.map(pressQuoteFromStrapi));
   const callToAction = callToActionFromStrapi(fragment?.callToAction);

   if (id == null || title == null || description == null || quotes == null)
      return null;

   return { type: 'PressQuotes', id, title, description, quotes, callToAction };
}
