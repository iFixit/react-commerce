import { STRAPI_ORIGIN } from '@config/env';
import { Collection, CollectionImage } from '../types';

export async function loadCollection(
   handle: string
): Promise<Collection | null> {
   return loadCollectionFromStrapi(handle);
}

async function loadCollectionFromStrapi(
   handle: string
): Promise<Collection | null> {
   const response = await fetch(`${STRAPI_ORIGIN}/graphql`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         query: collectionByHandleQuery,
         variables: {
            where: {
               handle,
            },
         },
      }),
   });
   if (response.ok) {
      const result = await response.json();
      const collection = result.data.collections[0];
      if (collection == null) {
         return null;
      }
      return {
         handle: collection.handle,
         title: collection.title,
         description: collection.description,
         filtersPreset: collection.filters,
         image: getImageFromStrapiImage(collection.image, 'medium'),
         ancestors: getAncestors(collection.parent),
         children: collection.children.map((child: any) => {
            return {
               handle: child.handle,
               title: child.title,
               image: getImageFromStrapiImage(child.image, 'thumbnail'),
            };
         }),
      };
   }
   throw new Error('Unable to fetch collection');
}

function getImageFromStrapiImage(
   image: any | null,
   format: 'medium' | 'small' | 'thumbnail'
): CollectionImage | null {
   if (image == null) {
      return null;
   }
   return {
      url: `${STRAPI_ORIGIN}${image.formats[format].url}`,
      alt: image.alternativeText,
   };
}

function getAncestors(parent: null | any): Collection[] {
   if (parent == null) {
      return [];
   }
   const ancestors: Collection[] = getAncestors(parent.parent);
   return ancestors.concat({
      handle: parent.handle,
      title: parent.title,
      ancestors: [],
      children: [],
   });
}

const collectionByHandleQuery = /* GraphQL */ `
   query getCollectionByHandle($where: JSON) {
      collections(limit: 1, where: $where) {
         id
         handle
         title
         description
         filters
         image {
            alternativeText
            url
            formats
         }
         parent {
            title
            handle
            parent {
               title
               handle
               parent {
                  title
                  handle
                  parent {
                     title
                     handle
                  }
               }
            }
         }
         children {
            handle
            title
            image {
               alternativeText
               url
               formats
            }
         }
      }
   }
`;
