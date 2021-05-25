export const ALGOLIA_APP_ID = checkEnv(
   process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
   'NEXT_PUBLIC_ALGOLIA_APP_ID'
);
export const ALGOLIA_API_KEY = checkEnv(
   process.env.NEXT_PUBLIC_ALGOLIA_API_KEY,
   'NEXT_PUBLIC_ALGOLIA_API_KEY'
);
export const SHOPIFY_DOMAIN = checkEnv(
   process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN,
   'NEXT_PUBLIC_SHOPIFY_DOMAIN'
);
export const SHOPIFY_STOREFRONT_ACCESS_TOKEN = checkEnv(
   process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
   'NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN'
);

function checkEnv(env: string | null | undefined, envName: string): string {
   if (env == null) {
      throw new Error(`environment variable "${envName}" is not defined`);
   }
   return env;
}
