import { z } from 'zod';

export type LifetimeWarrantySection = z.infer<
   typeof LifetimeWarrantySectionSchema
>;

export const LifetimeWarrantySectionSchema = z.object({
   type: z.literal('LifetimeWarranty'),
   id: z.string(),
});
