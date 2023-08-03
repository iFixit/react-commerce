import { GetServerSidePropsMiddleware } from '@lib/next-middleware';
import { Duration } from '../lib/duration';

interface CacheControlOptions {
   sMaxAge: number;
   staleWhileRevalidate: number;
}

const withCache =
   (options: CacheControlOptions): GetServerSidePropsMiddleware =>
   (next) =>
   (context) => {
      const maxAgeSeconds = options.sMaxAge / 1000;
      const staleWhileRevalidateSeconds = options.staleWhileRevalidate / 1000;
      context.res.setHeader(
         'Cache-Control',
         `public, s-maxage=${maxAgeSeconds}, max-age=${maxAgeSeconds}, stale-while-revalidate=${staleWhileRevalidateSeconds}`
      );
      return next(context);
   };

export const withCacheShort = withCacheControl({
   sMaxAge: Duration(1).second,
   staleWhileRevalidate: Duration(9).seconds,
});

export const withCacheLong = withCacheControl({
   sMaxAge: Duration(5).minutes,
   staleWhileRevalidate: Duration(1).day,
});
