import * as Sentry from '@sentry/nextjs';
import { urlFromContext } from '@ifixit/helpers/nextjs';
import { GetServerSidePropsContext } from 'next';

const shouldIgnoreUserAgent =
   typeof window !== 'undefined' && /Yeti/.test(window.navigator.userAgent);

export const sentryFetch: typeof fetch = async (resource, options) => {
   const context = {
      // Underscore sorts the resource first in Sentry's UI
      _resource: resource,
      headers: options?.headers,
      method: options?.method,
      // Parse to pretty print GraphQL queries
      body: options?.body ? JSON.parse(String(options?.body)) : undefined,
   };
   return fetch(resource, options)
      .then((response) => {
         if (
            !shouldIgnoreUserAgent &&
            response.status >= 500
         ) {
            const msg = `fetch() HTTP error: ${response.status} ${response.statusText}`;
            Sentry.captureException(new Error(msg), (scope) => {
               scope.setContext('request', context);
               return scope;
            });
            console.error(msg, context);
         }
         return response;
      })
      .catch((error) => {
         // We don't want to hear about network errors in Sentry
         console.error(error, context);
         throw error;
      });
};

export const setSentryPageContext = (context: GetServerSidePropsContext) => {
   Sentry.setTag('resolved_url', urlFromContext(context));
};
