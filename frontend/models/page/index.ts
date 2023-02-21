import { IFixitStatsSectionSchema } from '@models/shared/sections/ifixit-stats-section';
import { z } from 'zod';
import { BrowseSectionSchema } from './sections/browse-section';
import { HeroSectionSchema } from './sections/hero-section';

export type PageSection = z.infer<typeof PageSectionSchema>;

export const PageSectionSchema = z.union([
   HeroSectionSchema,
   BrowseSectionSchema,
   IFixitStatsSectionSchema,
]);

export type Page = z.infer<typeof PageSchema>;

export const PageSchema = z.object({
   path: z.string(),
   title: z.string(),
   sections: z.array(PageSectionSchema),
});
