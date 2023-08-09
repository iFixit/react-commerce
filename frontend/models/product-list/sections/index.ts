import { createSectionId } from '@helpers/strapi-helpers';
import { filterNullableItems } from '@ifixit/helpers';
import type { ProductListFieldsFragment } from '@lib/strapi-sdk';
import {
   lifetimeWarrantySectionFromStrapi,
   LifetimeWarrantySectionSchema,
} from '@models/sections/lifetime-warranty-section';
import {
   relatedPostsSectionFromStrapi,
   RelatedPostsSectionSchema,
} from '@models/sections/related-posts-section';
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
]);

interface ProductListSectionsArgs {
   strapiProductList: ProductListFieldsFragment | null | undefined;
}

export function productListSections({
   strapiProductList,
}: ProductListSectionsArgs) {
   const sections: ProductListSection[] = [
      heroSection(),
      productListChildrenSection(),
      filterableProductsSection(),
   ];
   const strapiSections = filterNullableItems(
      strapiProductList?.sections.map(productListSection)
   );
   sections.push(...strapiSections);
   return sections;
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
