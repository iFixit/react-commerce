import * as React from 'react';

interface ShopifyStorefrontClientOptions {
   shopDomain: string;
   storefrontAccessToken: string;
   apiVersion: string;
}

export class ShopifyStorefrontClient {
   shopDomain: string;
   accessToken: string;
   apiVersion: string;

   constructor(readonly options: ShopifyStorefrontClientOptions) {
      this.shopDomain = options.shopDomain
         .replace(/^https?:\/\//, '')
         .replace(/\/$/, '');
      this.accessToken = options.storefrontAccessToken;
      this.apiVersion = options.apiVersion;
   }

   async request<Payload = any, Variables = any>(
      query: string,
      variables?: Variables
   ): Promise<Payload> {
      const response = await fetch(
         `https://${this.shopDomain}/api/${this.apiVersion}/graphql.json`,
         {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               'X-Shopify-Storefront-Access-Token': this.accessToken,
            },
            body: JSON.stringify({ query, variables }),
         }
      );
      const json = await response.json();
      if (json.errors) {
         const msg = 'Shopify Storefront API error';
         console.error(msg, json.errors);
         // Current typescript target doesn't know about second argument to Error
         // @ts-ignore
         throw new Error(msg, {
            cause: {
               errors: json.errors,
               response: json,
               query,
               variables: JSON.stringify(variables, null, 2),
            },
         });
      }
      return json.data;
   }
}

const Context = React.createContext<ShopifyStorefrontClient | null>(null);

export type ShopifyStorefrontContextProviderProps = React.PropsWithChildren<{
   shopDomain: string;
   storefrontAccessToken: string;
   apiVersion: string;
}>;

export function ShopifyStorefrontProvider({
   shopDomain,
   storefrontAccessToken,
   apiVersion,
   children,
}: ShopifyStorefrontContextProviderProps) {
   const client = React.useMemo(() => {
      return new ShopifyStorefrontClient({
         shopDomain,
         storefrontAccessToken,
         apiVersion,
      });
   }, [shopDomain, storefrontAccessToken, apiVersion]);
   return <Context.Provider value={client}>{children}</Context.Provider>;
}

export function useShopifyStorefrontClient() {
   const client = React.useContext(Context);
   if (client == null) {
      throw new Error(
         'useShopifyStorefrontClient must be used within a ShopifyStorefrontProvider'
      );
   }
   return client;
}
