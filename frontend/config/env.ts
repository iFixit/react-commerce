export const ALGOLIA_APP_ID = checkEnv(
   process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
   'NEXT_PUBLIC_ALGOLIA_APP_ID'
);

export const ALGOLIA_API_KEY = checkEnv(
   process.env.ALGOLIA_API_KEY,
   'ALGOLIA_API_KEY'
);

const NEXT_PUBLIC_IFIXIT_ORIGIN = checkEnv(
   process.env.NEXT_PUBLIC_IFIXIT_ORIGIN,
   'NEXT_PUBLIC_IFIXIT_ORIGIN'
);

export const IFIXIT_ORIGIN = shouldUseRelativeOrigin(NEXT_PUBLIC_IFIXIT_ORIGIN) ?
   "" :
   NEXT_PUBLIC_IFIXIT_ORIGIN;

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

function shouldUseRelativeOrigin(ifixitOrigin: string): boolean {
   if (typeof window === 'undefined') {
      return false;
   }

   function baseDomain(url: string): string|null {
      const parsedUrl = new URL(url);
      const host = parsedUrl.host.match(/[^.]+\.[^.]+$/);
      return host ? host[0] : "";
   }

   const currentBaseDomain = baseDomain(window.location.origin);
   return Boolean(currentBaseDomain) && currentBaseDomain === baseDomain(ifixitOrigin);
}
