import {
   IFIXIT_API_ORIGIN,
   SHOPIFY_DOMAIN,
   SHOPIFY_STOREFRONT_ACCESS_TOKEN,
} from '@config/env';
import { StorefrontClient } from '@lib/storefrontClient';
import { Collection, Post } from '../types';

export async function loadCollection(
   handle: string
): Promise<Collection | null> {
   const client = new StorefrontClient({
      domain: SHOPIFY_DOMAIN,
      accessToken: SHOPIFY_STOREFRONT_ACCESS_TOKEN,
   });
   const {
      data: { collectionByHandle: collection },
   } = await client.request<DataWithMetafields>(collectionWithMetafieldsQuery, {
      handle,
   });
   if (collection == null) {
      return null;
   }
   const hierarchyMetafield = collection.metafields.edges.find(
      (edge) => edge.node.key === 'collection_hierarchy'
   );
   let ancestors: Collection[] = [];
   let children: Collection[] = [];
   if (hierarchyMetafield) {
      const hierarchy = JSON.parse(hierarchyMetafield.node.value);
      const childrenHandles = getChildrenHandles(hierarchy);
      children = await loadCollections(childrenHandles, client);
      const ancestorsHandles = getAncestorHandles(hierarchy).reverse();
      ancestors = await loadCollections(ancestorsHandles, client);
   }

   const news = await loadRelatedPosts([collection.title]);
   return {
      handle,
      title: collection.title,
      description: collection.description,
      image: collection.image,
      ancestors,
      children,
      relatedPosts: news,
   };
}

async function loadCollections(
   handles: string[],
   client: StorefrontClient
): Promise<Collection[]> {
   const responses = await Promise.all(
      handles.map((handle) => client.request<Data>(collectionQuery, { handle }))
   );
   return responses
      .filter((response) => response.data.collectionByHandle != null)
      .map((response) => {
         return {
            handle: response.data.collectionByHandle.handle,
            title: response.data.collectionByHandle.title,
            image: response.data.collectionByHandle.image,
            ancestors: [],
            children: [],
         };
      });
}

function getChildrenHandles(metafieldParsedValue: any): string[] {
   if (Array.isArray(metafieldParsedValue.children)) {
      return metafieldParsedValue.children.map((handle: string) =>
         handle.toLowerCase()
      );
   }
   return [];
}

function getAncestorHandles(metafieldParsedValue: any): string[] {
   if (Array.isArray(metafieldParsedValue.ancestors)) {
      return metafieldParsedValue.ancestors.map((handle: string) =>
         handle.toLowerCase()
      );
   }
   return [];
}

type DataWithMetafields = {
   data: {
      collectionByHandle: {
         handle: string;
         title: string;
         description: string;
         image?: {
            alt: string;
            url: string;
         };
         metafields: {
            edges: Array<{
               node: {
                  key: string;
                  value: string;
               };
            }>;
         };
      };
   };
};

const collectionWithMetafieldsQuery = /* GraphQL */ `
   query collection($handle: String!) {
      collectionByHandle(handle: $handle) {
         handle
         title
         description
         image {
            alt: altText
            url: transformedSrc
         }
         metafields(first: 10, namespace: "ifixit") {
            edges {
               node {
                  key
                  value
               }
            }
         }
      }
   }
`;

type Data = {
   data: {
      collectionByHandle: {
         handle: string;
         title: string;
         image?: {
            alt: string;
            url: string;
         };
      };
   };
};

const collectionQuery = /* GraphQL */ `
   query collection($handle: String!) {
      collectionByHandle(handle: $handle) {
         handle
         title
         image {
            alt: altText
            url: transformedSrc
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
