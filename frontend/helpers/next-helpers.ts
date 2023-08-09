import { PROD_USER_AGENT } from '@config/constants';
import { setSentryPageContext } from '@ifixit/sentry';
import { withTiming } from '@ifixit/helpers';
import type { GetServerSidePropsMiddleware } from '@lib/next-middleware';
import * as Sentry from '@sentry/nextjs';
import { GetServerSidePropsContext, NextPageContext } from 'next';

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

type ContextType = GetServerSidePropsContext;

export type GetRestrictRobots = (
   context: GetServerSidePropsContext
) => RestrictRobots | undefined;

enum RestrictRobots {
   RESTRICT_ALL = 'noindex, nofollow, nosnippet, noarchive, noimageindex',
   RESTRICT_INDEXING = 'noindex, follow, nosnippet, noarchive, noimageindex',
   RESTRICT_FOLLOWING = 'index, nofollow',
   ALLOW_ALL = 'index, follow',
}

export function withRobotsHeader(
   getRestrictRobots: GetRestrictRobots
): GetServerSidePropsMiddleware {
   return (next) => (context) => {
      maybeSetRobotsHeader(context, getRestrictRobots);
      return next(context);
   };
}

function maybeSetRobotsHeader(
   context: ContextType,
   maybeGetRestrictRobots: GetRestrictRobots
) {
   const restrictRobots = maybeGetRestrictRobots(context);
   if (restrictRobots) {
      context.res?.setHeader('X-Robots-Tag', restrictRobots);
   }
}

export function noindexDevDomains(context: ContextType) {
   if (context.req.headers['user-agent'] !== PROD_USER_AGENT) {
      // return RestrictRobots.RESTRICT_ALL;
   }

   return undefined;
}
