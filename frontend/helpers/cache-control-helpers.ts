import { CACHE_DISABLED } from '@config/env';
import { GetServerSidePropsMiddleware } from '@lib/next-middleware';
import { Duration } from '../lib/duration';
import { GetServerSidePropsContext, NextPageContext } from 'next';

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

type WithCacheProps = GetCacheControlOptions | CacheControlOptions;

const CACHE_CONTROL_DISABLED =
   'no-store, no-cache, must-revalidate, stale-if-error=0';

export function hasDisableCacheGets(
   context: GetServerSidePropsContext | NextPageContext
) {
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

type ContextType = GetServerSidePropsContext | NextPageContext;

export type GetCacheControlOptions = (
   context: ContextType
) => CacheControlOptions;

function withCacheValue(
   getCacheControlOptions: GetCacheControlOptions
): GetServerSidePropsMiddleware {
   return (next) => (context) => {
      setCache(context, getCacheControlOptions);
      return next(context);
   };
}

function setCache(
   context: ContextType,
   getCacheControlOptions: GetCacheControlOptions
) {
   const isCacheDisabled = hasDisableCacheGets(context);

   const cacheOptions = isCacheDisabled
      ? ({ disabled: true } as DisabledCacheControlOptions)
      : getCacheControlOptions(context);

   const cacheHeaderValue = getCacheString(cacheOptions);
   context.res?.setHeader('Cache-Control', cacheHeaderValue);
}

type GetInitialProps<T> = (context: NextPageContext) => Promise<T>;

export function withInitialCacheValue<T>(
   props: WithCacheProps,
   getInitialProps: GetInitialProps<T>
) {
   const getCacheControlOptions =
      typeof props === 'function' ? props : () => props;

   return async (context: NextPageContext) => {
      setCache(context, getCacheControlOptions);
      return getInitialProps(context);
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

export function withCache(props: WithCacheProps) {
   const getCacheControlOptions =
      typeof props === 'function' ? props : () => props;
   return withCacheValue(getCacheControlOptions);
}
