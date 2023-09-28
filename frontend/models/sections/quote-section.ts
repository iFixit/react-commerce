import { isPresent } from '@ifixit/helpers';
import type { QuoteSectionFieldsFragment } from '@lib/strapi-sdk';
import { imageFromStrapi, ImageSchema } from '@models/components/image';
import { z } from 'zod';

export type QuoteSection = z.infer<typeof QuoteSectionSchema>;

export const QuoteSectionSchema = z.object({
   type: z.literal('Quote'),
   id: z.string(),
   text: z.string(),
   author: z.string().nullable(),
   image: ImageSchema.nullable(),
});

export function quoteSectionFromStrapi(
   fragment: QuoteSectionFieldsFragment | null | undefined,
   sectionId: string
): QuoteSection | null {
   const text = fragment?.text;

   if (!isPresent(text)) return null;

   return {
      type: 'Quote',
      id: sectionId,
      text,
      author: fragment?.author ?? null,
      image: imageFromStrapi(fragment?.image),
   };
}
