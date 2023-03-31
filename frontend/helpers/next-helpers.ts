import { PROD_USER_AGENT } from '@config/constants';
import { CACHE_DISABLED } from '@config/env';
import { setSentryPageContext } from '@ifixit/sentry';
import { withTiming } from '@ifixit/helpers';
import type { GetServerSidePropsMiddleware } from '@lib/next-middleware';
import * as Sentry from '@sentry/nextjs';
import { GetServerSidePropsContext } from 'next';

export const withLogging: GetServerSidePropsMiddleware = (next) => {
   return withTiming(`server_side_props`, async (context) => {
      console.log('context.resolvedUrl', context.resolvedUrl);
      console.log('context.req.url', context.req.url);
      Sentry.setContext('Extra Info', {
         headers: context.req.headers,
         url: context.req.url,
         method: context.req.method,
         locale: context.locale,
         ...context.params,
         ...context.query,
      });
      const isCacheDisabled =
         CACHE_DISABLED || context.query._vercel_no_cache === '1';
      return next(context)
         .then((result) => {
            if (isCacheDisabled) {
               context.res.setHeader(
                  'Cache-Control',
                  'no-store, no-cache, must-revalidate, stale-if-error=0'
               );
            }
            return result;
         })
         .catch((err) => {
            setSentryPageContext(context);
            throw err;
         });
   });
};

export function noindexDevDomains(context: GetServerSidePropsContext) {
   if (context.req.headers['user-agent'] !== PROD_USER_AGENT) {
      context.res.setHeader('X-Robots-Tag', 'noindex, nofollow');
   }
}

export const withNoindexDevDomains: GetServerSidePropsMiddleware = (next) => {
   return (context) => {
      const result = next(context);
      noindexDevDomains(context);
      return result;
   };
};

export const withSentry: GetServerSidePropsMiddleware = (next) => {
   return (context) => {
      return new Promise((resolve, reject) => {
         next(context).then(resolve, (e) => {
            Sentry.captureException(e);
            setTimeout(() => reject(e), 1000);
         });
      });
   };
};
