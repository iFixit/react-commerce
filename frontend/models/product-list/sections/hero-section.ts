import { z } from 'zod';

export type HeroSection = z.infer<typeof HeroSectionSchema>;

export const HeroSectionSchema = z.object({
   type: z.literal('Hero'),
   id: z.string(),
});

export function heroSection(): HeroSection {
   return {
      type: 'Hero',
      id: 'hero',
   };
}
