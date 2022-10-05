import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { logAsync } from '@ifixit/helpers';
import { setSentryPageContext } from '@ifixit/sentry';
import * as Sentry from '@sentry/nextjs';
import { PROD_HOSTNAME } from '@config/constants';

export function serverSidePropsWrapper<T>(
   getServerSidePropsInternal: GetServerSideProps<T>
): GetServerSideProps<T> {
   return async (context) => {
      Sentry.setContext('Extra Info', {
         headers: context?.req.headers,
         url: context?.req.url,
         method: context?.req.method,
         locale: context?.locale,
         ...context?.params,
         ...context?.query,
      });
      return logAsync('getServerSideProps', () =>
         getServerSidePropsInternal(context)
      ).catch((err) => {
         setSentryPageContext(context);
         throw err;
      });
   };
}

export function noindexDevDomains(
   url: string,
   context: GetServerSidePropsContext
) {
   if (new URL(url).hostname !== PROD_HOSTNAME) {
      context.res.setHeader('X-Robots-Tag', 'noindex, nofollow');
   }
}
