import { filterNullableItems } from '@helpers/application-helpers';
import { assertNever } from '@ifixit/helpers';
import { FindPageQuery, strapi } from '@lib/strapi-sdk';
import { featuredProductsSectionFromStrapi } from '@models/sections/featured-products-section';
import { iFixitStatsSectionFromStrapi } from '@models/sections/ifixit-stats-section';
import { socialGallerySectionFromStrapi } from '@models/sections/social-gallery-section';
import { splitWithImageSectionFromStrapi } from '@models/sections/split-with-image-section';
import type { Page, PageSection } from '.';
import { browseSectionFromStrapi } from './sections/browse-section';
import { heroSectionFromStrapi } from './sections/hero-section';
import { pressQuotesSectionFromStrapi } from './sections/press-quotes-section';

interface FindPageArgs {
   path: string;
}

export async function findPage({ path }: FindPageArgs): Promise<Page | null> {
   const response = await strapi.findPage({
      filters: {
         path: {
            eq: path,
         },
      },
   });
   const page = pageFromStrapi(response);

   if (page == null) {
      return null;
   }

   const sections = await sectionsFromStrapi(
      page.sections,
      async (section, index) => {
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
               return splitWithImageSectionFromStrapi(section, index);
            }
            case 'ComponentPagePress': {
               return pressQuotesSectionFromStrapi(section, index);
            }
            case 'ComponentSectionFeaturedProducts': {
               return featuredProductsSectionFromStrapi(section, index);
            }
            case 'ComponentSectionSocialGallery': {
               return socialGallerySectionFromStrapi(section, index);
            }
            case 'Error': {
               console.error('Failed to parse page section:', section);
               return null;
            }
            default: {
               return assertNever(section);
            }
         }
      }
   );

   return {
      path: page.path,
      title: page.title,
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
