import { filterNullableItems } from '@helpers/application-helpers';
import { assertNever } from '@ifixit/helpers';
import { FindPageQuery, strapi } from '@lib/strapi-sdk';
import { iFixitStatsSectionFromStrapi } from '@models/shared/sections/ifixit-stats-section';
import { splitWithImageSectionFromStrapi } from '@models/shared/sections/split-with-image-section';
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

   const sections = sectionsFromStrapi(page.sections, (section, index) => {
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
         case 'Error': {
            console.error('Failed to parse page section:', section);
            return null;
         }
         default: {
            return assertNever(section);
         }
      }
   });

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

function sectionsFromStrapi(
   sections: StrapiPage['sections'],
   fn: (section: StrapiSection, index: number) => PageSection | null
) {
   return filterNullableItems(
      sections?.map((section, index) =>
         section == null ? null : fn(section, index)
      ) ?? []
   );
}
