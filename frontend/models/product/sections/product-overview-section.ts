import { z } from 'zod';

export type ProductOverviewSection = z.infer<
   typeof ProductOverviewSectionSchema
>;

export const ProductOverviewSectionSchema = z.object({
   type: z.literal('ProductOverview'),
   id: z.string(),
});
