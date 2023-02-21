import {
   filterFalsyItems,
   filterNullableItems,
} from '@helpers/application-helpers';
import { assertNever } from '@ifixit/helpers';
import { CategoryFieldsFragment, strapi } from '@lib/strapi-sdk';
import { imageFromStrapi } from '@models/shared/components/image';
import type { Page, PageSection } from '.';
import { getProductListType } from '../product-list/server';
import type { BrowseCategory } from './sections/browse-section';

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
   const page = response.pages?.data[0]?.attributes;
   if (page == null) {
      return null;
   }

   const sections = filterNullableItems(
      page.sections?.map((section, index): PageSection | null => {
         if (section == null) {
            return null;
         }
         switch (section?.__typename) {
            case 'ComponentPageHero': {
               return {
                  type: 'Hero',
                  id: `${section.__typename}-${index}`,
                  title: section.title ?? null,
                  description: section.description ?? null,
                  callToAction: section.callToAction ?? null,
                  image: imageFromStrapi(section.image),
               };
            }
            case 'ComponentPageBrowse': {
               const categories: BrowseCategory[] = filterFalsyItems(
                  section.categories?.map(processStrapiProductList)
               );
               return {
                  type: 'Browse',
                  id: `${section.__typename}-${index}`,
                  title: section.title ?? null,
                  description: section.description ?? null,
                  image: imageFromStrapi(section.image),
                  categories,
               };
            }
            case 'ComponentPageStats': {
               const stats = filterFalsyItems(section.stats).map(
                  ({ id, label, value }) => {
                     return { id, label, value };
                  }
               );
               return {
                  type: 'IFixitStats',
                  id: `${section.__typename}-${index}`,
                  stats,
               };
            }
            case 'Error': {
               console.error('Failed to parse page section:', section);
               return null;
            }
            default: {
               return assertNever(section);
            }
         }
      }) ?? []
   );

   return {
      path: page.path,
      title: page.title,
      sections,
   };
}

function processStrapiProductList(
   categoryFragment: CategoryFieldsFragment | null | undefined
): BrowseCategory | null {
   const id = categoryFragment?.id;
   const attributes = categoryFragment?.productList?.data?.attributes;
   if (id == null || attributes == null) {
      return null;
   }
   return {
      id,
      type: getProductListType(attributes.type),
      handle: attributes.handle,
      title: attributes.title,
      deviceTitle: attributes.deviceTitle ?? null,
      metaDescription: attributes.metaDescription ?? null,
      image: imageFromStrapi(attributes.image),
   };
}
