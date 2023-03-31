import { z } from 'zod';

export type CrossSellSection = z.infer<typeof CrossSellSectionSchema>;

export const CrossSellSectionSchema = z.object({
   type: z.literal('CrossSell'),
   id: z.string(),
   title: z.string().nullable(),
});
