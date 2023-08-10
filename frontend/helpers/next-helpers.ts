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
      return next(context).catch((err) => {
         setSentryPageContext(context);
         throw err;
      });
   });
};

export enum RestrictRobots {
   RESTRICT_ALL = 'noindex, nofollow, nosnippet, noarchive, noimageindex',
   RESTRICT_INDEXING = 'noindex, follow, nosnippet, noarchive, noimageindex',
   RESTRICT_FOLLOWING = 'index, nofollow',
   ALLOW_ALL = 'index, follow',
}
