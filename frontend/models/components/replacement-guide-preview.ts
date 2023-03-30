import { parseJSONMetafield } from '@helpers/storefront-helpers';
import { printZodError } from '@helpers/zod-helpers';
import { filterNullableItems } from '@ifixit/helpers';
import { z } from 'zod';

export type ReplacementGuidePreview = z.infer<
   typeof ReplacementGuidePreviewSchema
>;

export const ReplacementGuidePreviewSchema = z.object({
   id: z.string(),
   title: z.string(),
   url: z.string(),
   imageUrl: z.string().optional().nullable(),
   summary: z.preprocess(
      (val) => (typeof val === 'string' ? val : null),
      z.string().optional().nullable()
   ),
   difficulty: z.string().optional().nullable(),
   timeRequired: z.string().optional().nullable(),
});

const ReplacementGuideMetafieldItemSchema = z.object({
   title: z.string(),
   guide_url: z.string(),
   image_url: z.string().optional().nullable(),
   summary: z.preprocess(
      (val) => (typeof val === 'string' ? val : null),
      z.string().optional().nullable()
   ),
   difficulty: z.string().optional().nullable(),
   time_required: z.string().optional().nullable(),
});

export function replacementGuidePreviewFromMetafield(
   value: string | null | undefined
): ReplacementGuidePreview[] {
   const json = parseJSONMetafield(value);
   if (!Array.isArray(json)) {
      return [];
   }
   const guides = json.map((item, index): ReplacementGuidePreview | null => {
      const result = ReplacementGuideMetafieldItemSchema.safeParse(item);
      if (result.success) {
         return {
            id: String(index),
            title: result.data.title,
            url: result.data.guide_url,
            imageUrl: result.data.image_url,
            summary: result.data.summary,
            difficulty: result.data.difficulty,
            timeRequired: result.data.time_required,
         };
      }
      printZodError(result.error, 'replacement guide');
      return null;
   });
   return filterNullableItems(guides);
}
