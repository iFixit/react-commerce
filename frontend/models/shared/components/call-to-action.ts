import { z } from 'zod';

export const CallToActionSchema = z.object({
   title: z.string(),
   url: z.string(),
});

export type CallToAction = z.infer<typeof CallToActionSchema>;
