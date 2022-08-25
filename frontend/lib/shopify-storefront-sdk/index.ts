import { SHOPIFY_STOREFRONT_VERSION } from '@config/env';
import { getSdk, Requester } from './generated/sdk';
export * from './generated/sdk';

export type ShopCredentials = {
   shopDomain: string;
   accessToken: string;
};

export function getShopifyStorefrontSdk(shop: ShopCredentials) {
   const requester: Requester = async <R, V>(
      doc: string,
      variables: V
   ): Promise<R> => {
      const response = await fetch(
         `https://${shop.shopDomain}/api/${SHOPIFY_STOREFRONT_VERSION}/graphql.json`,
         {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               'X-Shopify-Storefront-Access-Token': shop.accessToken,
            },
            body: JSON.stringify({
               query: doc,
               variables,
            }),
         }
      );
      let result: any;
      try {
         result = await response.json();
      } catch (error) {
         throw new Error(`Response is not a json: ${response.statusText}`);
      }
      if (response.ok) {
         if (result?.data) {
            return result.data;
         }
         throw new Error('Data not available in GraphQL response');
      }
      if (Array.isArray(result.errors)) {
         console.error('GraphQL query failed with errors:');
         result.errors.map((error: any) => {
            const code = error.extensions?.code || 'UNKNOWN';
            console.error(`\t[${code}]`, error.message);
         });
      }
      throw new Error(
         `GraphQL query failed to execute: ${response.statusText}`
      );
   };

   return getSdk(requester);
}
