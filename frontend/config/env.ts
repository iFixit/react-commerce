export const ALGOLIA_APP_ID = checkEnv(
   process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
   'NEXT_PUBLIC_ALGOLIA_APP_ID'
);

export const ALGOLIA_API_KEY = checkEnv(
   process.env.NEXT_PUBLIC_ALGOLIA_API_KEY,
   'NEXT_PUBLIC_ALGOLIA_API_KEY'
);

export const IFIXIT_API_ORIGIN = checkEnv(
   process.env.NEXT_PUBLIC_IFIXIT_API_ORIGIN,
   'NEXT_PUBLIC_IFIXIT_API_ORIGIN'
);

export const STRAPI_ORIGIN = checkEnv(
   process.env.NEXT_PUBLIC_STRAPI_ORIGIN,
   'NEXT_PUBLIC_STRAPI_ORIGIN'
);

function checkEnv(env: string | null | undefined, envName: string): string {
   if (env == null) {
      if (process.browser) {
         if (envName.startsWith('NEXT_PUBLIC')) {
            console.warn(`environment variable "${envName}" is not defined`);
         }
         return env as any;
      }
      throw new Error(`environment variable "${envName}" is not defined`);
   }
   return env;
}
