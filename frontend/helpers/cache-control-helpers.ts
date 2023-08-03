import { CACHE_DISABLED } from '@config/env';
import { GetServerSidePropsMiddleware } from '@lib/next-middleware';
import { Duration } from '../lib/duration';
import { GetServerSidePropsContext } from 'next';

interface EnabledCacheControlOptions {
   sMaxAge: number;
   staleWhileRevalidate: number;
}

interface DisabledCacheControlOptions {
   disabled: true;
}

type CacheControlOptions =
   | EnabledCacheControlOptions
   | DisabledCacheControlOptions;

type withCacheProps = GetCacheControlOptions | CacheControlOptions;

const CACHE_CONTROL_DISABLED =
   'no-store, no-cache, must-revalidate, stale-if-error=0';

export function hasDisableCacheGets(context: GetServerSidePropsContext) {
   if (CACHE_DISABLED) {
      return true;
   }

   return context.query.disableCacheGets !== undefined;
}

function getCacheString(options: CacheControlOptions) {
   if ('disabled' in options) {
      return CACHE_CONTROL_DISABLED;
   }

   const maxAgeSeconds = options.sMaxAge / 1000;
   const staleWhileRevalidateSeconds = options.staleWhileRevalidate / 1000;
   return `public, s-maxage=${maxAgeSeconds}, max-age=${maxAgeSeconds}, stale-while-revalidate=${staleWhileRevalidateSeconds}`;
}

export type GetCacheControlOptions = (
   context: GetServerSidePropsContext
) => CacheControlOptions;

function withCacheValue(
   getCacheControlOptions: GetCacheControlOptions
): GetServerSidePropsMiddleware {
   return (next) => (context) => {
      const isCacheDisabled = hasDisableCacheGets(context);

      const cacheOptions = isCacheDisabled
         ? ({ disabled: true } as DisabledCacheControlOptions)
         : getCacheControlOptions(context);

      const cacheHeaderValue = getCacheString(cacheOptions);

      context.res.setHeader('Cache-Control', cacheHeaderValue);
      return next(context);
   };
}

export const CacheShort: CacheControlOptions = {
   sMaxAge: Duration(1).second,
   staleWhileRevalidate: Duration(9).seconds,
};

export const CacheLong: CacheControlOptions = {
   sMaxAge: Duration(5).minutes,
   staleWhileRevalidate: Duration(1).day,
};

export function withCache(props: withCacheProps) {
   const getCacheControlOptions =
      typeof props === 'function' ? props : () => props;
   return withCacheValue(getCacheControlOptions);
}
