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
      window.fetch = withSentry(window.fetch);
   } else {
      global.fetch = withSentry(global.fetch);
   }
};

export const iFixitAPIRequestHeaderName = 'X-iFixit-API-Request';

const withSentry: FetchMiddleware = (fetcher) => async (input, init) => {
   const headers = new Headers(init?.headers);
   const shouldSkipRequest = headers.has(iFixitAPIRequestHeaderName);
   if (shouldSkipRequest) {
      headers.delete(iFixitAPIRequestHeaderName);

      return fetcher(input, {
         ...init,
         headers,
      });
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
         captureException(new Error(msg), {
            contexts: [['request', context]],
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

type SentryDetails = {
   contexts?: [string, any][];
   tags?: [string, string][];
   extra?: [string, any][];
};

export function setSentryDetails(
   { contexts, tags, extra }: SentryDetails,
   scope?: Scope
) {
   const sentryScope = scope || Sentry.getCurrentHub().getScope();
   contexts?.forEach(([key, value]) => {
      sentryScope.setContext(key, value);
   });

   tags?.forEach(([key, value]) => {
      sentryScope.setTag(key, value);
   });

   extra?.forEach(([key, value]) => {
      sentryScope.setExtra(key, value);
   });
}

export function captureException(e: any, sentryDetails: SentryDetails) {
   Sentry.captureException(e, (scope) => {
      setSentryDetails(sentryDetails, scope as Scope);
      return scope;
   });
}
