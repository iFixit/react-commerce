import { CallToActionSchema } from '@models/shared/components/call-to-action';
import { ImageSchema } from '@models/shared/components/image';
import { z } from 'zod';

export type HeroSection = z.infer<typeof HeroSectionSchema>;

export const HeroSectionSchema = z.object({
   type: z.literal('Hero'),
   id: z.string(),
   title: z.string().nullable(),
   description: z.string().nullable(),
   image: ImageSchema.nullable(),
   callToAction: CallToActionSchema.nullable(),
});
