import { PressQuotesSectionSchema } from '@models/sections/press-quotes-section';
import { BannersSectionSchema } from '@models/sections/banners-section';
import { QuoteGallerySectionSchema } from '@models/sections/quote-gallery-section';
import { SplitWithImageSectionSchema } from '@models/sections/split-with-image-section';
import { z } from 'zod';
import { SectionPlacementSchema } from './components/placement';
import { FAQsSectionSchema } from '@models/sections/faqs-section';

export type ReusableSection = z.infer<typeof ReusableSectionSchema>;

export const ReusableSectionSchema = z.object({
   section: z.union([
      BannersSectionSchema,
      SplitWithImageSectionSchema,
      QuoteGallerySectionSchema,
      PressQuotesSectionSchema,
      FAQsSectionSchema,
   ]),
   placements: z.array(SectionPlacementSchema),
   priority: z.number(),
   positionInProductList: z.enum(['top', 'after products', 'bottom']),
});
