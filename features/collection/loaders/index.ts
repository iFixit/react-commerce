import {
   SHOPIFY_DOMAIN,
   SHOPIFY_STOREFRONT_ACCESS_TOKEN,
   WP_BASIC_AUTH_PASSWORD,
   WP_BASIC_AUTH_USER,
   WP_ORIGIN,
} from '@config/env';
import { StorefrontClient } from '@lib/storefrontClient';
import { Collection, News } from '../types';

export async function loadCollection(
   handle: string
): Promise<Collection | null> {
   const client = new StorefrontClient({
      domain: SHOPIFY_DOMAIN,
      accessToken: SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      version: 'unstable',
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

   const news = await loadRelatedNews([collection.title]);
   return {
      handle,
      title: collection.title,
      description: collection.description,
      image: collection.image,
      ancestors,
      children,
      relatedNews: news,
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

interface Post {
   ID: number;
   post_author: string;
   post_date: string;
   post_date_gmt: string;
   post_content: string;
   post_title: string;
   post_excerpt: string;
   permalink?: string;
   featured_image: PostImage;
   categories: PostCategory[];
}

interface PostCategory {
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

interface PostImage {
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

async function loadRelatedNews(tags: string[]): Promise<News[]> {
   const base64Credentials = convertToBase64(
      `${WP_BASIC_AUTH_USER}:${WP_BASIC_AUTH_PASSWORD}`
   );
   const response = await fetch(`${WP_ORIGIN}/wp-json/wp/v2/posts/related`, {
      method: 'POST',
      body: JSON.stringify({ tags }),
      headers: {
         Authorization: `Basic ${base64Credentials}`,
         'Content-Type': 'application/json',
      },
   });
   if (response.status >= 200 && response.status < 300) {
      const rawStories: Post[] = await response.json();
      return rawStories.map<News>((rawStory) => {
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

function convertToBase64(value: string): string {
   const buffer = Buffer.from(value);
   return buffer.toString('base64');
}
