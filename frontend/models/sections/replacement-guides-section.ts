import { ReplacementGuidePreviewSchema } from '@models/components/replacement-guide-preview';
import { z } from 'zod';

export type ReplacementGuidesSection = z.infer<
   typeof ReplacementGuidesSectionSchema
>;

export const ReplacementGuidesSectionSchema = z.object({
   type: z.literal('ReplacementGuides'),
   id: z.string(),
   title: z.string().nullable(),
   guides: z.array(ReplacementGuidePreviewSchema),
});
