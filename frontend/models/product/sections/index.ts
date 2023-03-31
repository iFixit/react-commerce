import { filterFalsyItems } from '@helpers/application-helpers';
import { createSectionId } from '@helpers/strapi-helpers';
import type { FindProductQuery as ShopifyFindProductQuery } from '@lib/shopify-storefront-sdk';
import type { FindProductQuery as StrapiFindProductQuery } from '@lib/strapi-sdk';
import { replacementGuidePreviewFromMetafield } from '@models/components/replacement-guide-preview';
import {
   featuredProductPreviewsFromShopifyProduct,
   featuredProductsSectionFromStrapi,
   FeaturedProductsSectionSchema,
} from '@models/sections/featured-products-section';
import { ReplacementGuidesSectionSchema } from '@models/sections/replacement-guides-section';
import { ServiceValuePropositionSectionSchema } from '@models/sections/service-value-proposition-section';
import {
   splitWithImageSectionFromStrapi,
   SplitWithImageSectionSchema,
} from '@models/sections/split-with-image-section';
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

interface GetProductSectionsArgs {
   shopifyProduct: ShopifyProduct;
   strapiProduct?: StrapiProduct | null;
}

type ShopifyProduct = NonNullable<ShopifyFindProductQuery['product']>;
type StrapiProduct = NonNullable<StrapiFindProductQuery['products']>['data'][0];

export async function getProductSections({
   shopifyProduct,
   strapiProduct,
}: GetProductSectionsArgs): Promise<ProductSection[]> {
   if (!strapiProduct) return getDefaultProductSections({ shopifyProduct });

   const strapiSections = strapiProduct.attributes?.sections ?? [];

   const productSections = await Promise.all(
      strapiSections.map(
         async (section, index): Promise<ProductSection | null> => {
            if (section == null) return null;

            const sectionId = createSectionId(section, index);

            switch (section.__typename) {
               case 'ComponentProductProduct':
                  return {
                     type: 'ProductOverview',
                     id: sectionId,
                  };
               case 'ComponentProductReplacementGuides':
                  return {
                     type: 'ReplacementGuides',
                     id: sectionId,
                     title: section.title ?? null,
                     guides: replacementGuidePreviewFromMetafield(
                        shopifyProduct.replacementGuides?.value
                     ),
                  };
               case 'ComponentSectionServiceValuePropositions':
                  return {
                     type: 'ServiceValueProposition',
                     id: sectionId,
                  };
               case 'ComponentProductCrossSell':
                  return {
                     type: 'CrossSell',
                     id: sectionId,
                     title: section.title ?? null,
                  };
               case 'ComponentProductProductCustomerReviews':
                  return {
                     type: 'ProductReviews',
                     id: sectionId,
                     title: section.title ?? null,
                  };
               case 'ComponentSectionFeaturedProducts':
                  return featuredProductsSectionFromStrapi({
                     strapiSection: section,
                     sectionId,
                     fallbackProducts:
                        featuredProductPreviewsFromShopifyProduct(
                           shopifyProduct
                        ),
                  });
               case 'ComponentSectionLifetimeWarranty':
                  return {
                     type: 'LifetimeWarranty',
                     id: sectionId,
                     title: section.title ?? null,
                     description: section.description ?? null,
                  };
               case 'ComponentPageSplitWithImage':
                  return splitWithImageSectionFromStrapi(section, sectionId);

               default:
                  return null;
            }
         }
      )
   );

   return filterFalsyItems(productSections);
}

interface GetDefaultProductSectionsArgs {
   shopifyProduct: ShopifyProduct;
}

export function getDefaultProductSections({
   shopifyProduct,
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
         shopifyProduct.replacementGuides?.value
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
      title: null,
   });
   sections.push({
      type: 'ProductReviews',
      id: createSectionId(
         { __typename: 'ProductReviewsSection' },
         sections.length
      ),
      title: null,
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
      products: featuredProductPreviewsFromShopifyProduct(shopifyProduct),
   });
   sections.push({
      type: 'LifetimeWarranty',
      id: createSectionId(
         { __typename: 'LifetimeWarrantySection' },
         sections.length
      ),
      title: null,
      description: null,
   });

   return sections;
}
