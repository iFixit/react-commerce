import * as Sentry from '@sentry/nextjs';
import { urlFromContext } from '@ifixit/helpers/nextjs';
import { GetServerSidePropsContext } from 'next';
import { Scope } from '@sentry/nextjs';

type Fetcher = typeof fetch;

type FetchMiddleware = (
   fetcher: Fetcher,
   shouldSkipRequest?: SkipRequestFn
) => Fetcher;

type FetcherParams = Parameters<Fetcher>;

type SkipRequestFn = (...args: FetcherParams) => boolean;

type CaptureWithContextFn = (
   e: Error,
   context: Parameters<Scope['setContext']>[1]
) => void;

const isClientSide = typeof window !== 'undefined';

const shouldIgnoreUserAgent =
   isClientSide && /Yeti/.test(window.navigator.userAgent);

export const setSentryPageContext = (context: GetServerSidePropsContext) => {
   Sentry.setTag('resolved_url', urlFromContext(context));
};

export const applySentryFetchMiddleware = () => {
   if (isClientSide) {
      window.fetch = withSentry(window.fetch, shouldSkipReporting);
   } else {
      global.fetch = withSentry(global.fetch, shouldSkipReporting);
   }
};

const withSentry: FetchMiddleware =
   (fetcher, shouldSkipRequest) => async (input, init) => {
      if (shouldSkipRequest?.(input, init)) {
         return fetcher(input, init);
      }
      const context = {
         // Underscore sorts the resource first in Sentry's UI
         _resource: input,
         headers: init?.headers,
         method: init?.method,
         // Parse to pretty print GraphQL queries
         body: init?.body ? JSON.parse(String(init?.body)) : undefined,
      };
      try {
         const response = await fetcher(input, init);
         if (
            !shouldIgnoreUserAgent &&
            response.status >= 400 &&
            ![401, 404, 499].includes(response.status)
         ) {
            const msg = `fetch() HTTP error: ${response.status} ${response.statusText}`;
            Sentry.captureException(new Error(msg), (scope) => {
               scope.setContext('request', context);
               return scope;
            });
            console.error(msg, context);
         }
         return response;
      } catch (error) {
         // We don't want to hear about network errors in Sentry
         console.error(error, context);
         throw error;
      }
   };

const shouldSkipReporting: SkipRequestFn = (input, init) => {
   const url = getRequestUrl(input);
   // We have custom logic in place for reporting errors only after React Query retries have failed,
   // so we don't want to report errors for the cart API here.
   return url.includes('/store/user/cart');
};

const getRequestUrl = (input: RequestInfo | URL) => {
   if (typeof input === 'string') {
      return input;
   }
   if (input instanceof URL) {
      return input.href;
   }
   return input.url;
};
