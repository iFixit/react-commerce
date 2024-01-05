import { filterFalsyItems } from '@helpers/application-helpers';
import { createSectionId } from '@helpers/strapi-helpers';
import type { FindProductQuery as ShopifyFindProductQuery } from '@lib/shopify-storefront-sdk';
import type { FindProductQuery as StrapiFindProductQuery } from '@lib/strapi-sdk';
import { replacementGuidePreviewFromMetafield } from '@models/components/replacement-guide-preview';
import {
   bannersSectionFromStrapi,
   BannersSectionSchema,
} from '@models/sections/banners-section';
import {
   bitTableSectionFromStrapi,
   BitTableSectionSchema,
} from '@models/sections/bit-table-section';
import {
   faqsSectionFromStrapi,
   FAQsSectionSchema,
} from '@models/sections/faqs-section';
import {
   featuredProductPreviewsFromShopifyProduct,
   featuredProductsSectionFromStrapi,
   FeaturedProductsSectionSchema,
} from '@models/sections/featured-products-section';
import {
   quoteSectionFromStrapi,
   QuoteSectionSchema,
} from '@models/sections/quote-section';
import { ReplacementGuidesSectionSchema } from '@models/sections/replacement-guides-section';
import { ServiceValuePropositionSectionSchema } from '@models/sections/service-value-proposition-section';
import {
   splitWithImageSectionFromStrapi,
   SplitWithImageSectionSchema,
} from '@models/sections/split-with-image-section';
import { z } from 'zod';
import { LifetimeWarrantySectionSchema } from '../../sections/lifetime-warranty-section';
import { DeviceCompatibilitySectionSchema } from './compatibility-section';
import { ProductOverviewSectionSchema } from './product-overview-section';
import { ProductReviewsSectionSchema } from './product-reviews-section';
import {
   toolsSectionFromStrapi,
   ToolsSectionSchema,
} from '@models/sections/tools-section';

export type ProductSection = z.infer<typeof ProductSectionSchema>;

export const ProductSectionSchema = z.union([
   ProductOverviewSectionSchema,
   SplitWithImageSectionSchema,
   ReplacementGuidesSectionSchema,
   ProductReviewsSectionSchema,
   DeviceCompatibilitySectionSchema,
   FeaturedProductsSectionSchema,
   LifetimeWarrantySectionSchema,
   ServiceValuePropositionSectionSchema,
   BannersSectionSchema,
   QuoteSectionSchema,
   FAQsSectionSchema,
   BitTableSectionSchema,
   ToolsSectionSchema,
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
      strapiSections.map(async (section): Promise<ProductSection | null> => {
         if (section == null) return null;

         const sectionId = createSectionId(section);

         if (sectionId == null) return null;

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
            case 'ComponentProductProductCustomerReviews':
               return {
                  type: 'ProductReviews',
                  id: sectionId,
                  title: section.title ?? null,
               };
            case 'ComponentProductDeviceCompatibility':
               return {
                  type: 'DeviceCompatibility',
                  id: sectionId,
                  title: section.title ?? null,
                  description: section.description ?? null,
               };
            case 'ComponentSectionFeaturedProducts':
               return featuredProductsSectionFromStrapi({
                  strapiSection: section,
                  sectionId,
                  fallbackProducts:
                     featuredProductPreviewsFromShopifyProduct(shopifyProduct),
               });
            case 'ComponentSectionLifetimeWarranty':
               return {
                  type: 'LifetimeWarranty',
                  id: sectionId,
                  title: section.title ?? null,
                  description: section.description ?? null,
                  callToAction: null,
               };
            case 'ComponentPageSplitWithImage':
               return splitWithImageSectionFromStrapi(section, sectionId);

            case 'ComponentSectionBanner':
               return bannersSectionFromStrapi(section, sectionId);

            case 'ComponentSectionFaqs':
               return faqsSectionFromStrapi(section, sectionId);

            case 'ComponentSectionQuote':
               return quoteSectionFromStrapi(section, sectionId);

            case 'ComponentProductBitTable':
               return bitTableSectionFromStrapi(section, sectionId);

            case 'ComponentSectionTools': {
               return toolsSectionFromStrapi(section, sectionId);
            }

            default:
               return null;
         }
      })
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
      id: createSectionId({
         __typename: 'ProductOverviewSection',
         id: sections.length.toString(),
      }),
   });
   sections.push({
      type: 'ReplacementGuides',
      id: createSectionId({
         __typename: 'ReplacementGuidesSection',
         id: sections.length.toString(),
      }),
      title: null,
      guides: replacementGuidePreviewFromMetafield(
         shopifyProduct.replacementGuides?.value
      ),
   });
   sections.push({
      type: 'ServiceValueProposition',
      id: createSectionId({
         __typename: 'ServiceValuePropositionSection',
         id: sections.length.toString(),
      }),
   });
   sections.push({
      type: 'ProductReviews',
      id: createSectionId({
         __typename: 'ProductReviewsSection',
         id: sections.length.toString(),
      }),
      title: null,
   });
   sections.push({
      type: 'DeviceCompatibility',
      id: createSectionId({
         __typename: 'DeviceCompatibilitySection',
         id: sections.length.toString(),
      }),
      title: null,
      description: null,
   });
   sections.push({
      type: 'FeaturedProducts',
      id: createSectionId({
         __typename: 'FeaturedProductsSection',
         id: sections.length.toString(),
      }),
      title: 'Featured Products',
      description: null,
      background: 'white',
      products: featuredProductPreviewsFromShopifyProduct(shopifyProduct),
   });
   sections.push({
      type: 'LifetimeWarranty',
      id: createSectionId({
         __typename: 'LifetimeWarrantySection',
         id: sections.length.toString(),
      }),
      title: null,
      description: null,
      callToAction: null,
   });

   return sections;
}
