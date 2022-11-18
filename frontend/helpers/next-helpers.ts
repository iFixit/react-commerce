import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { logAsync } from '@ifixit/helpers';
import { setSentryPageContext } from '@ifixit/sentry';
import * as Sentry from '@sentry/nextjs';
import { PROD_USER_AGENT } from '@config/constants';
import { clearCache } from '@lib/cache';
import { CACHE_DISABLED } from '@config/env';

export function serverSidePropsWrapper<T extends { [key: string]: any }>(
   getServerSidePropsInternal: GetServerSideProps<T>
): GetServerSideProps<T> {
   return async (context) => {
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
      return logAsync('getServerSideProps', () =>
         getServerSidePropsInternal(context)
      )
         .then((result) => {
            if (CACHE_DISABLED || context.query._vercel_no_cache === '1') {
               context.res.setHeader(
                  'Cache-Control',
                  'no-store, no-cache, must-revalidate, stale-if-error=0'
               );
               clearCache();
            }
            return result;
         })
         .catch((err) => {
            setSentryPageContext(context);
            throw err;
         });
   };
}

export function noindexDevDomains(context: GetServerSidePropsContext) {
   if (context.req.headers['user-agent'] !== PROD_USER_AGENT) {
      context.res.setHeader('X-Robots-Tag', 'noindex, nofollow');
   }
}
