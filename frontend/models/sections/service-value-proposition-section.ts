import { z } from 'zod';

export type ServiceValuePropositionSection = z.infer<
   typeof ServiceValuePropositionSectionSchema
>;

export const ServiceValuePropositionSectionSchema = z.object({
   type: z.literal('ServiceValueProposition'),
   id: z.string(),
});
