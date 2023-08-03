import { CACHE_DISABLED } from '@config/env';
import { GetServerSidePropsMiddleware } from '@lib/next-middleware';
import { Duration } from '../lib/duration';
import { GetServerSidePropsContext } from 'next';

interface CacheControlOptions {
   sMaxAge: number;
   staleWhileRevalidate: number;
}

const CACHE_CONTROL_DISABLED =
   'no-store, no-cache, must-revalidate, stale-if-error=0';

export function hasDisableCacheGets(context: GetServerSidePropsContext) {
   if (CACHE_DISABLED) {
      return true;
   }

   const { disableCacheGets, revisionid } = context.query;

   if (disableCacheGets !== undefined) {
      return true;
   }

   const wantsHeadRevision = revisionid?.toString().toUpperCase() === 'HEAD';
   return wantsHeadRevision;
}

function getCacheString(options: CacheControlOptions) {
   const maxAgeSeconds = options.sMaxAge / 1000;
   const staleWhileRevalidateSeconds = options.staleWhileRevalidate / 1000;
   return `public, s-maxage=${maxAgeSeconds}, max-age=${maxAgeSeconds}, stale-while-revalidate=${staleWhileRevalidateSeconds}`;
}

function withCacheValue(cacheValue: string): GetServerSidePropsMiddleware {
   return (next) => (context) => {
      const isCacheDisabled = hasDisableCacheGets(context);
      const cacheHeaderValue = isCacheDisabled
         ? CACHE_CONTROL_DISABLED
         : cacheValue;

      context.res.setHeader('Cache-Control', cacheHeaderValue);
      return next(context);
   };
}

export const withCacheShort = withCacheValue(
   getCacheString({
      sMaxAge: Duration(1).second,
      staleWhileRevalidate: Duration(9).seconds,
   })
);

export const withCacheLong = withCacheValue(
   getCacheString({
      sMaxAge: Duration(5).minutes,
      staleWhileRevalidate: Duration(1).day,
   })
);
