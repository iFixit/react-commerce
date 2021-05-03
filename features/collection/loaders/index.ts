import { SHOPIFY_DOMAIN, SHOPIFY_STOREFRONT_ACCESS_TOKEN } from '@config/env';
import { StorefrontClient } from '@libs/storefrontClient';
import { Collection } from '../types';

export async function loadCollection(handle: string): Promise<Collection> {
   const client = new StorefrontClient({
      domain: SHOPIFY_DOMAIN,
      accessToken: SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      version: 'unstable',
   });
   const response = await client.request<DataWithMetafields>(
      collectionWithMetafieldsQuery,
      {
         handle,
      }
   );
   const hierarchyMetafield = response.data.collectionByHandle.metafields.edges.find(
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
   return {
      handle,
      title: response.data.collectionByHandle.title,
      description: response.data.collectionByHandle.description,
      image: response.data.collectionByHandle.image,
      ancestors,
      children,
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
      return metafieldParsedValue.children.map((handle) =>
         handle.toLowerCase()
      );
   }
   return [];
}

function getAncestorHandles(metafieldParsedValue: any): string[] {
   if (Array.isArray(metafieldParsedValue.ancestors)) {
      return metafieldParsedValue.ancestors.map((handle) =>
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
