import { createSectionId } from '@helpers/strapi-helpers';
import type { FindProductQuery } from '@lib/shopify-storefront-sdk';
import { replacementGuidePreviewFromMetafield } from '@models/components/replacement-guide-preview';
import { ReplacementGuidesSectionSchema } from '@models/sections/replacement-guides-section';
import { SplitWithImageSectionSchema } from '@models/sections/split-with-image-section';
import { z } from 'zod';
import { ProductOverviewSectionSchema } from './product-overview-section';

export type ProductSection = z.infer<typeof ProductSectionSchema>;

export const ProductSectionSchema = z.union([
   ProductOverviewSectionSchema,
   SplitWithImageSectionSchema,
   ReplacementGuidesSectionSchema,
]);

type QueryProduct = NonNullable<FindProductQuery['product']>;

interface GetDefaultProductSectionsArgs {
   queryProduct: QueryProduct;
}

export function getDefaultProductSections({
   queryProduct,
}: GetDefaultProductSectionsArgs): ProductSection[] {
   const sections: ProductSection[] = [];
   sections.push({
      type: 'ProductOverview',
      id: createSectionId(
         { __typename: 'ProductOverviewSection' },
         sections.length
      ),
   });
   sections.push({
      type: 'ReplacementGuides',
      id: createSectionId(
         { __typename: 'ReplacementGuidesSection' },
         sections.length
      ),
      title: null,
      guides: replacementGuidePreviewFromMetafield(
         queryProduct.replacementGuides?.value
      ),
   });
   return sections;
}
