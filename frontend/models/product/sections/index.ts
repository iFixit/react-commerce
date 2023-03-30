import { createSectionId } from '@helpers/strapi-helpers';
import type { FindProductQuery } from '@lib/shopify-storefront-sdk';
import { replacementGuidePreviewFromMetafield } from '@models/components/replacement-guide-preview';
import {
   featuredProductPreviewsFromShopifyProduct,
   FeaturedProductsSectionSchema,
} from '@models/sections/featured-products-section';
import { ReplacementGuidesSectionSchema } from '@models/sections/replacement-guides-section';
import { ServiceValuePropositionSectionSchema } from '@models/sections/service-value-proposition-section';
import { SplitWithImageSectionSchema } from '@models/sections/split-with-image-section';
import { z } from 'zod';
import { DeviceCompatibilitySectionSchema } from './compatibility-section';
import { CrossSellSectionSchema } from './cross-sell-section';
import { LifetimeWarrantySectionSchema } from './lifetime-warranty-section';
import { ProductOverviewSectionSchema } from './product-overview-section';
import { ProductReviewsSectionSchema } from './product-reviews-section';

export type ProductSection = z.infer<typeof ProductSectionSchema>;

export const ProductSectionSchema = z.union([
   ProductOverviewSectionSchema,
   SplitWithImageSectionSchema,
   ReplacementGuidesSectionSchema,
   CrossSellSectionSchema,
   ProductReviewsSectionSchema,
   DeviceCompatibilitySectionSchema,
   FeaturedProductsSectionSchema,
   LifetimeWarrantySectionSchema,
   ServiceValuePropositionSectionSchema,
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
   sections.push({
      type: 'ServiceValueProposition',
      id: createSectionId(
         { __typename: 'ServiceValuePropositionSection' },
         sections.length
      ),
   });
   sections.push({
      type: 'CrossSell',
      id: createSectionId({ __typename: 'CrossSellSection' }, sections.length),
   });
   sections.push({
      type: 'ProductReviews',
      id: createSectionId(
         { __typename: 'ProductReviewsSection' },
         sections.length
      ),
   });
   sections.push({
      type: 'DeviceCompatibility',
      id: createSectionId(
         { __typename: 'DeviceCompatibilitySection' },
         sections.length
      ),
   });
   sections.push({
      type: 'FeaturedProducts',
      id: createSectionId(
         { __typename: 'FeaturedProductsSection' },
         sections.length
      ),
      title: 'Featured Products',
      description: null,
      background: 'white',
      products: featuredProductPreviewsFromShopifyProduct(queryProduct),
   });
   sections.push({
      type: 'LifetimeWarranty',
      id: createSectionId(
         { __typename: 'LifetimeWarrantySection' },
         sections.length
      ),
   });

   return sections;
}
