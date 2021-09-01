import { IFIXIT_API_ORIGIN, STRAPI_ORIGIN } from '@config/env';
import { Collection, CollectionImage, Post } from '../types';

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
      const relatedPostSection = collection.sections.find(
         (section: any) =>
            section.__typename === 'ComponentCollectionRelatedPosts'
      );
      const tags =
         relatedPostSection?.tags?.split(',').map((tag: any) => tag.trim()) ||
         [];
      const relatedPosts = await loadRelatedPosts(
         [collection.title].concat(tags)
      );
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
         relatedPosts,
         sections: collection.sections,
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
      sections: [],
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
         sections {
            __typename
            ... on ComponentCollectionBanner {
               id
               title
               description
               callToActionLabel
               url
            }
            ... on ComponentCollectionRelatedPosts {
               id
               tags
            }
            ... on ComponentCollectionNewsletterForm {
               id
               title
               description
               inputPlaceholder
               callToActionLabel
            }
         }
      }
   }
`;

interface RawPost {
   ID: number;
   post_author: string;
   post_date: string;
   post_date_gmt: string;
   post_content: string;
   post_title: string;
   post_excerpt: string;
   permalink?: string;
   featured_image: RawPostImage;
   categories: RawPostCategory[];
}

interface RawPostCategory {
   term_id: number;
   name: string;
   slug: string;
   term_group: number;
   term_taxonomy_id: number;
   taxonomy: string;
   description: string;
   parent: number;
   count: number;
   filter: string;
   cat_ID: number;
   category_count: number;
   category_description: string;
   cat_name: string;
   category_nicename: string;
   category_parent: number;
}

interface RawPostImage {
   thumbnail: string;
   medium: string;
   medium_large: string;
   large: string;
   '1536x1536': string;
   '2048x2048': string;
   'post-header': string;
   sm: string;
   md: string;
   lg: string;
   'homepage-featured': string;
   'homepage-small': string;
   'homepage-medium': string;
   'rp4wp-thumbnail-post': string;
}

async function loadRelatedPosts(tags: string[]): Promise<Post[]> {
   const response = await fetch(
      `${IFIXIT_API_ORIGIN}/api/2.0/related_posts?data=${encodeURIComponent(
         JSON.stringify({ tags })
      )}`
   );
   if (response.status >= 200 && response.status < 300) {
      const rawStories: RawPost[] = await response.json();
      return rawStories.map<Post>((rawStory) => {
         return {
            id: rawStory.ID,
            title: rawStory.post_title,
            date: rawStory.post_date,
            category: rawStory.categories[0]?.name,
            image: rawStory.featured_image
               ? { url: rawStory.featured_image.md }
               : null,
            permalink: rawStory.permalink || '',
         };
      });
   }
   throw new Error(`failed with status "${response.statusText}"`);
}
