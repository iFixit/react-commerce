import { z } from 'zod';

export type IFixitStat = z.infer<typeof IFixitStatSchema>;

export const IFixitStatSchema = z.object({
   id: z.string(),
   label: z.string(),
   value: z.string(),
});

export type IFixitStatsSection = z.infer<typeof IFixitStatsSectionSchema>;

export const IFixitStatsSectionSchema = z.object({
   type: z.literal('IFixitStats'),
   id: z.string(),
   stats: z.array(IFixitStatSchema),
});
