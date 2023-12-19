import { filterNullableItems } from '@helpers/application-helpers';
import { createSectionId } from '@helpers/strapi-helpers';
import { presence, timeAsync } from '@ifixit/helpers';
import { FindPageQuery, strapi } from '@lib/strapi-sdk';
import { bannersSectionFromStrapi } from '@models/sections/banners-section';
import { featuredProductsSectionFromStrapi } from '@models/sections/featured-products-section';
import { iFixitStatsSectionFromStrapi } from '@models/sections/ifixit-stats-section';
import { quoteGallerySectionFromStrapi } from '@models/sections/quote-gallery-section';
import { socialGallerySectionFromStrapi } from '@models/sections/social-gallery-section';
import { splitWithImageSectionFromStrapi } from '@models/sections/split-with-image-section';
import type { Page, PageSection } from '.';
import { pressQuotesSectionFromStrapi } from '../sections/press-quotes-section';
import { browseSectionFromStrapi } from './sections/browse-section';
import { heroSectionFromStrapi } from './sections/hero-section';

interface FindPageArgs {
   path: string;
}

export async function findPage({ path }: FindPageArgs): Promise<Page | null> {
   const response = await timeAsync('strapi.findPage', () =>
      strapi.findPage({
         filters: {
            path: {
               eq: path,
            },
         },
      })
   );
   const page = pageFromStrapi(response);

   if (page == null) {
      return null;
   }

   const sections = await sectionsFromStrapi(
      page.sections,
      async (section, index) => {
         const sectionId = createSectionId(section);
         if (sectionId == null) return null;

         switch (section.__typename) {
            case 'ComponentPageHero': {
               return heroSectionFromStrapi(section, index);
            }
            case 'ComponentPageBrowse': {
               return browseSectionFromStrapi(section, index);
            }
            case 'ComponentPageStats': {
               return iFixitStatsSectionFromStrapi(section, index);
            }
            case 'ComponentPageSplitWithImage': {
               return splitWithImageSectionFromStrapi(section, sectionId);
            }
            case 'ComponentPagePress': {
               return pressQuotesSectionFromStrapi(section, sectionId);
            }
            case 'ComponentSectionFeaturedProducts': {
               return featuredProductsSectionFromStrapi({
                  strapiSection: section,
                  sectionId,
               });
            }
            case 'ComponentSectionSocialGallery': {
               return socialGallerySectionFromStrapi(section, index);
            }
            case 'ComponentSectionLifetimeWarranty': {
               return {
                  type: 'LifetimeWarranty',
                  id: sectionId,
                  title: section.title ?? null,
                  description: section.description ?? null,
                  callToAction: null,
               };
            }
            case 'ComponentSectionBanner': {
               return bannersSectionFromStrapi(section, sectionId);
            }
            case 'ComponentSectionQuoteGallery': {
               return quoteGallerySectionFromStrapi(section, sectionId);
            }
            default: {
               return null;
            }
         }
      }
   );

   return {
      path: page.path,
      title: page.title,
      metaTitle: presence(page.metaTitle),
      metaDescription: presence(page.metaDescription),
      sections,
   };
}

type StrapiPage = NonNullable<ReturnType<typeof pageFromStrapi>>;

function pageFromStrapi(response: FindPageQuery) {
   return response.pages?.data[0]?.attributes ?? null;
}

type StrapiSection = NonNullable<StrapiPage['sections'][0]>;

async function sectionsFromStrapi(
   sections: StrapiPage['sections'],
   fn: (section: StrapiSection, index: number) => Promise<PageSection | null>
) {
   const promises = await Promise.all(
      sections.map((section, index) =>
         section == null ? null : fn(section, index)
      )
   );
   return filterNullableItems(promises);
}
