export const ALGOLIA_APP_ID = checkEnv(
   process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
   'NEXT_PUBLIC_ALGOLIA_APP_ID'
);

export const ALGOLIA_API_KEY = checkEnv(
   process.env.ALGOLIA_API_KEY,
   'ALGOLIA_API_KEY'
);

export const IFIXIT_ORIGIN = checkEnv(
   process.env.NEXT_PUBLIC_IFIXIT_ORIGIN,
   'NEXT_PUBLIC_IFIXIT_ORIGIN'
);

export const STRAPI_ORIGIN = checkEnv(
   process.env.NEXT_PUBLIC_STRAPI_ORIGIN,
   'NEXT_PUBLIC_STRAPI_ORIGIN'
);

export const MATOMO_URL = checkEnv(
   process.env.NEXT_PUBLIC_MATOMO_URL,
   'NEXT_PUBLIC_MATOMO_URL'
);

export const GA_URL = checkEnv(
   process.env.NEXT_PUBLIC_GA_URL,
   'NEXT_PUBLIC_GA_URL'
);

export const GA_KEY = checkEnv(
   process.env.NEXT_PUBLIC_GA_KEY,
   'NEXT_PUBLIC_GA_KEY'
);

export const GA_DEBUG = checkEnv(
   process.env.NEXT_PUBLIC_GA_DEBUG,
   'NEXT_PUBLIC_GA_DEBUG'
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
