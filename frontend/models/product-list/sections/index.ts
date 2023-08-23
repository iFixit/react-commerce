import { createSectionId } from '@helpers/strapi-helpers';
import { filterNullableItems } from '@ifixit/helpers';
import type { ProductListFieldsFragment } from '@lib/strapi-sdk';
import { PressQuotesSectionSchema } from '@models/sections/press-quotes-section';
import type { ReusableSection } from '@models/reusable-section';
import { BannersSectionSchema } from '@models/sections/banners-section';
import {
   lifetimeWarrantySectionFromStrapi,
   LifetimeWarrantySectionSchema,
} from '@models/sections/lifetime-warranty-section';
import { QuoteGallerySectionSchema } from '@models/sections/quote-gallery-section';
import {
   relatedPostsSectionFromStrapi,
   RelatedPostsSectionSchema,
} from '@models/sections/related-posts-section';
import { SplitWithImageSectionSchema } from '@models/sections/split-with-image-section';
import groupBy from 'lodash/groupBy';
import mapValues from 'lodash/mapValues';
import orderBy from 'lodash/orderBy';
import { z } from 'zod';
import {
   featuredProductListsSectionFromStrapi,
   FeaturedProductListsSectionSchema,
} from './featured-product-lists-section';
import {
   filterableProductsSection,
   FilterableProductsSectionSchema,
} from './filterable-products-section';
import { heroSection, HeroSectionSchema } from './hero-section';
import {
   productListChildrenSection,
   ProductListChildrenSectionSchema,
} from './product-list-children-section';

export type ProductListSection = z.infer<typeof ProductListSectionSchema>;

export const ProductListSectionSchema = z.union([
   HeroSectionSchema,
   ProductListChildrenSectionSchema,
   FilterableProductsSectionSchema,
   LifetimeWarrantySectionSchema,
   RelatedPostsSectionSchema,
   FeaturedProductListsSectionSchema,
   BannersSectionSchema,
   SplitWithImageSectionSchema,
   QuoteGallerySectionSchema,
   PressQuotesSectionSchema,
]);

interface ProductListSectionsArgs {
   strapiProductList: ProductListFieldsFragment | null | undefined;
   reusableSections: ReusableSection[];
}

export function productListSections({
   strapiProductList,
   reusableSections,
}: ProductListSectionsArgs) {
   const sections: ProductListSection[] = [
      heroSection(),
      productListChildrenSection(),
      filterableProductsSection(),
   ];
   const sectionsByPosition = getSectionsBucketByPosition(reusableSections);

   insertSections({
      from: sectionsByPosition['top'] ?? [],
      into: sections,
      after: 'top',
   });

   insertSections({
      from: sectionsByPosition['after products'] ?? [],
      into: sections,
      after: 'FilterableProducts',
   });

   const strapiSections = filterNullableItems(
      strapiProductList?.sections.map(productListSection)
   );
   insertSections({
      from: strapiSections,
      into: sections,
      after: 'bottom',
   });

   insertSections({
      from: sectionsByPosition['bottom'] ?? [],
      into: sections,
      after: 'bottom',
   });

   return sections;
}

interface InsertSectionsArgs {
   into: ProductListSection[];
   from: ProductListSection[];
   after: 'top' | 'bottom' | ProductListSection['type'];
}

function insertSections({ into, from, after }: InsertSectionsArgs): void {
   if (after === 'top') {
      into.splice(0, 0, ...from);
   } else if (after === 'bottom') {
      into.push(...from);
   } else {
      const index = into.findIndex((section) => section.type === after);
      if (index !== -1) {
         into.splice(index + 1, 0, ...from);
      }
   }
}

function getSectionsBucketByPosition(
   reusableSections: ReusableSection[]
): Record<ReusableSection['positionInProductList'], ProductListSection[]> {
   const sectionsByPosition = groupBy(
      reusableSections,
      'positionInProductList'
   ) as Record<ReusableSection['positionInProductList'], ReusableSection[]>;
   const sortedReusableSectionsByPosition = mapValues(
      sectionsByPosition,
      (sections): ProductListSection[] =>
         orderBy(sections, 'priority', 'desc').map((section) => section.section)
   );
   return sortedReusableSectionsByPosition;
}

function productListSection(
   strapiSection: ProductListFieldsFragment['sections'][number]
): ProductListSection | null {
   if (strapiSection == null) return null;

   const sectionId = createSectionId(strapiSection);

   if (sectionId == null) return null;

   switch (strapiSection.__typename) {
      case 'ComponentProductListBanner':
         return lifetimeWarrantySectionFromStrapi(strapiSection, sectionId);
      case 'ComponentProductListRelatedPosts':
         return relatedPostsSectionFromStrapi(strapiSection, sectionId);
      case 'ComponentProductListLinkedProductListSet':
         return featuredProductListsSectionFromStrapi(strapiSection, sectionId);
      default:
         return null;
   }
}
