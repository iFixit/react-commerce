import { filterFalsyItems } from '@helpers/application-helpers';
import type { QuoteGallerySectionFieldsFragment } from '@lib/strapi-sdk';
import {
   quoteCardFromStrapiFragment,
   QuoteCardSchema,
} from '@models/components/quote-card';
import { z } from 'zod';

export type QuoteGallerySection = z.infer<typeof QuoteGallerySectionSchema>;

export const QuoteGallerySectionSchema = z.object({
   type: z.literal('QuoteGallery'),
   id: z.string(),
   title: z.string().nullable(),
   description: z.string().nullable(),
   quotes: z.array(QuoteCardSchema),
});

export function quoteGallerySectionFromStrapi(
   fragment: QuoteGallerySectionFieldsFragment | null | undefined,
   sectionId: string
): QuoteGallerySection | null {
   const title = fragment?.title ?? null;
   const description = fragment?.description ?? null;
   const strapiQuotes = fragment?.quotes ?? [];
   const quotes = filterFalsyItems(
      strapiQuotes.map(quoteCardFromStrapiFragment)
   );

   if (quotes.length === 0) return null;

   return {
      type: 'QuoteGallery',
      id: sectionId,
      title,
      description,
      quotes,
   };
}
