import { CACHE_DISABLED, IFIXIT_ORIGIN } from '@config/env';
import { headers } from 'next/headers';

export function shouldSkipCache(
   searchParams: Record<string, string | string[] | undefined>
) {
   return searchParams.disableCacheGets != null || CACHE_DISABLED;
}

export function ifixitOrigin(): string {
   return devSandboxOrigin() ?? IFIXIT_ORIGIN;
}

function devSandboxOrigin(): string | null {
   const host =
      headers().get('x-ifixit-forwarded-host') ||
      headers().get('x-forwarded-host');
   const isDevProxy = !!host?.match(
      /^(?!react-commerce).*(\.cominor\.com|\.ubreakit\.com)$/
   );
   return isDevProxy ? `https://${host}` : null;
}
