import { filterNullableItems } from '@helpers/application-helpers';
import { createSectionId } from '@helpers/strapi-helpers';
import {
   Enum_Reusablesection_Positioninproductlist,
   FindReusableSectionsQuery,
   ReusableSectionFiltersInput,
   strapi,
} from '@lib/strapi-sdk';
import { pressQuotesSectionFromStrapi } from '@models/sections/press-quotes-section';
import { bannersSectionFromStrapi } from '@models/sections/banners-section';
import { quoteGallerySectionFromStrapi } from '@models/sections/quote-gallery-section';
import { splitWithImageSectionFromStrapi } from '@models/sections/split-with-image-section';
import { ReusableSection } from '.';
import { getPlacementFromStrapi } from './components/placement';

export interface FindReusableSectionArgs {
   filters: ReusableSectionFiltersInput;
}

export async function findReusableSections({
   filters,
}: FindReusableSectionArgs): Promise<ReusableSection[]> {
   const strapiSections = await strapi.findReusableSections({ filters });
   return filterNullableItems(
      strapiSections.reusableSections?.data.map(
         createReusableSectionFromStrapiSection
      )
   );
}

type ReusableStrapiSection = NonNullable<
   NonNullable<FindReusableSectionsQuery['reusableSections']>['data'][number]
>;

function createReusableSectionFromStrapiSection(
   strapiReusableSection: ReusableStrapiSection
): ReusableSection | null {
   const strapiSection = strapiReusableSection.attributes?.section?.[0];
   const sectionId = createSectionId(strapiSection);
   const placements = filterNullableItems(
      strapiReusableSection.attributes?.placement?.map(getPlacementFromStrapi)
   );

   if (strapiSection == null || sectionId == null || placements == null)
      return null;

   let section: ReusableSection['section'] | null = null;

   switch (strapiSection.__typename) {
      case 'ComponentSectionBanner': {
         section = bannersSectionFromStrapi(strapiSection, sectionId);
         break;
      }
      case 'ComponentPageSplitWithImage': {
         section = splitWithImageSectionFromStrapi(strapiSection, sectionId);
         break;
      }
      case 'ComponentSectionQuoteGallery': {
         section = quoteGallerySectionFromStrapi(strapiSection, sectionId);
         break;
      }
      case 'ComponentPagePress': {
         section = pressQuotesSectionFromStrapi(strapiSection, sectionId);
         break;
      }
   }
   if (section == null) return null;
   return {
      section,
      placements,
      priority: strapiReusableSection.attributes?.priority ?? 0,
      positionInProductList: getPositionInProductList(
         strapiReusableSection.attributes?.positionInProductList
      ),
   };
}

function getPositionInProductList(
   strapiPosition: Enum_Reusablesection_Positioninproductlist | undefined
): ReusableSection['positionInProductList'] {
   switch (strapiPosition) {
      case Enum_Reusablesection_Positioninproductlist.Top:
         return 'top';
      case Enum_Reusablesection_Positioninproductlist.Bottom:
         return 'bottom';
      default:
         return 'after products';
   }
}
