import { FeaturedProductsSectionSchema } from '@models/shared/sections/featured-products-section';
import { IFixitStatsSectionSchema } from '@models/shared/sections/ifixit-stats-section';
import { SplitWithImageSectionSchema } from '@models/shared/sections/split-with-image-section';
import { z } from 'zod';
import { BrowseSectionSchema } from './sections/browse-section';
import { HeroSectionSchema } from './sections/hero-section';
import { PressQuotesSectionSchema } from './sections/press-quotes-section';

export type PageSection = z.infer<typeof PageSectionSchema>;

export const PageSectionSchema = z.union([
   HeroSectionSchema,
   BrowseSectionSchema,
   IFixitStatsSectionSchema,
   SplitWithImageSectionSchema,
   PressQuotesSectionSchema,
   FeaturedProductsSectionSchema,
]);

export type Page = z.infer<typeof PageSchema>;

export const PageSchema = z.object({
   path: z.string(),
   title: z.string(),
   sections: z.array(PageSectionSchema),
});
