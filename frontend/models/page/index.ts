import { FeaturedProductsSectionSchema } from '@models/sections/featured-products-section';
import { IFixitStatsSectionSchema } from '@models/sections/ifixit-stats-section';
import { SocialGallerySectionSchema } from '@models/sections/social-gallery-section';
import { SplitWithImageSectionSchema } from '@models/sections/split-with-image-section';
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
   SocialGallerySectionSchema,
]);

export type Page = z.infer<typeof PageSchema>;

export const PageSchema = z.object({
   path: z.string(),
   title: z.string(),
   sections: z.array(PageSectionSchema),
});
