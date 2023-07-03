import { createSectionId } from '@helpers/strapi-helpers';
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

export type ProductListSection = z.infer<typeof ProductListSectionSchema>;

export const ProductListSectionSchema = z.union([
   LifetimeWarrantySectionSchema,
   RelatedPostsSectionSchema,
   FeaturedProductListsSectionSchema,
]);

export function getProductListSection(
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
