import { Awaited, filterNullableItems } from '@lib/utils';
import { getLayoutProps } from '../layout';
import { strapi } from '../strapi';
import { getImageFromStrapiImage } from '../utils';

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
   return {
      ...getLayoutProps(result),
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
   };
}

export type CollectionData = NonNullable<
   Awaited<ReturnType<typeof fetchCollectionPageData>>
>['collection'];

type StrapiCollectionPageData = NonNullable<
   NonNullable<Awaited<ReturnType<typeof strapi['getCollectionPageData']>>>
>;

type StrapiCollection = NonNullable<
   NonNullable<StrapiCollectionPageData['collections']>[0]
>;

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
