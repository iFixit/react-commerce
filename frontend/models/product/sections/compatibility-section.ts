import { z } from 'zod';

export type DeviceCompatibilitySection = z.infer<
   typeof DeviceCompatibilitySectionSchema
>;

export const DeviceCompatibilitySectionSchema = z.object({
   type: z.literal('DeviceCompatibility'),
   id: z.string(),
});
