import { STRAPI_ORIGIN } from '@config/env';
import { assertNever, Awaited, filterNullableItems } from '@lib/utils';
import { strapi } from '../strapi';

interface FetchCollectionPageDataOptions {
   collectionHandle: string;
   storeCode: string;
}

export async function fetchCollectionPageData(
   options: FetchCollectionPageDataOptions
) {
   const result = await strapi.getCollectionPageData({
      whereCollection: { handle: options.collectionHandle },
      whereStoreSettings: {
         store: {
            code: options.storeCode,
         },
      },
   });
   const collection = result.collections?.[0];
   if (collection == null) {
      return null;
   }
   const storeSettings = result.storeSettings?.[0];
   const footer = storeSettings?.footer;
   const socialMediaAccounts = storeSettings?.socialMediaAccounts || {};
   const stores = filterNullableItems(result.stores);
   return {
      collection: {
         handle: collection.handle,
         title: collection.title,
         description: collection.description,
         filtersPreset: collection.filters,
         image: getImageFromStrapiImage(collection.image, 'medium'),
         ancestors: getAncestors(collection.parent),
         children: filterNullableItems(collection.children).map((child) => {
            return {
               handle: child.handle,
               title: child.title,
               image: getImageFromStrapiImage(child.image, 'thumbnail'),
            };
         }),
         sections: filterNullableItems(collection.sections),
      },
      footer: {
         menu1: footer?.menu1 ? getMenu(footer.menu1) : undefined,
         menu2: footer?.menu2 ? getMenu(footer.menu2) : undefined,
         partners: footer?.partners ? getMenu(footer.partners) : undefined,
         bottomMenu: footer?.bottomMenu
            ? getMenu(footer.bottomMenu)
            : undefined,
      },
      socialMediaAccounts,
      stores,
   };
}

export type CollectionPageData = NonNullable<
   Awaited<ReturnType<typeof fetchCollectionPageData>>
>;

type StrapiCollectionPageData = NonNullable<
   NonNullable<Awaited<ReturnType<typeof strapi['getCollectionPageData']>>>
>;

type StrapiCollection = NonNullable<
   NonNullable<StrapiCollectionPageData['collections']>[0]
>;

type StoreSettings = NonNullable<
   NonNullable<StrapiCollectionPageData['storeSettings']>[0]
>;

type Footer = NonNullable<StoreSettings['footer']>;

type Menu = NonNullable<Footer['menu1']>;

function getImageFromStrapiImage(
   image: any | null,
   format: 'medium' | 'small' | 'thumbnail'
) {
   if (image == null) {
      return null;
   }
   return {
      url: `${STRAPI_ORIGIN}${
         image.formats[format] ? image.formats[format].url : image.url
      }`,
      alt: image.alternativeText,
   };
}

interface Ancestor {
   handle: string;
   title: string;
}

function getAncestors(parent: StrapiCollection['parent']): Ancestor[] {
   if (parent == null) {
      return [];
   }
   const ancestors = getAncestors(parent.parent);
   return ancestors.concat({
      handle: parent.handle,
      title: parent.title,
   });
}

function getMenu(rawMenu: Menu) {
   return {
      items: filterNullableItems(rawMenu.items).map((item) => {
         switch (item.__typename) {
            case 'ComponentMenuLink': {
               return {
                  name: item.name,
                  url: item.url,
               };
            }
            case 'ComponentMenuLinkWithImage': {
               return {
                  name: item.name,
                  url: item.url,
                  image:
                     getImageFromStrapiImage(item.image, 'small') || undefined,
               };
            }
            case 'ComponentMenuCollectionLink': {
               return {
                  name: item.name,
                  url: item.linkedCollection
                     ? `/collections/${item.linkedCollection.handle}`
                     : '#',
               };
            }
            default:
               return assertNever(item);
         }
      }),
   };
}
