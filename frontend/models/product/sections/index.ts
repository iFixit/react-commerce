import { createSectionId } from '@helpers/strapi-helpers';
import { SplitWithImageSectionSchema } from '@models/sections/split-with-image-section';
import { z } from 'zod';
import { ProductOverviewSectionSchema } from './product-overview-section';

export type ProductSection = z.infer<typeof ProductSectionSchema>;

export const ProductSectionSchema = z.union([
   ProductOverviewSectionSchema,
   SplitWithImageSectionSchema,
]);

export function getDefaultProductSections(): ProductSection[] {
   const sections: ProductSection[] = [];
   sections.push({
      type: 'ProductOverview',
      id: createSectionId(
         { __typename: 'ProductOverviewSection' },
         sections.length
      ),
   });
   return sections;
}
