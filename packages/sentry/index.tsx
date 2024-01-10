import * as Sentry from '@sentry/nextjs';
import { urlFromContext } from '@ifixit/helpers/nextjs';
import { GetServerSidePropsContext } from 'next';
import { Scope } from '@sentry/nextjs';

export * from './SentryErrorIntegration';

type Fetcher = typeof fetch;

type FetchMiddleware = (fetcher: Fetcher) => Fetcher;

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

   let body;
   try {
      body = init?.body ? JSON.parse(String(init?.body)) : undefined;
   } catch (e) {
      body = init?.body ?? undefined;
   }

   const context = {
      // Underscore sorts the resource first in Sentry's UI
      _resource: input,
      headers: init?.headers,
      method: init?.method,
      // Parse to pretty print GraphQL queries
      body,
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
            contexts: {
               request: context,
               response: {
                  status: response.status,
                  statusText: response.statusText,
               },
            },
            tags: {
               request_url: input.toString(),
               response_status_code: response.status.toString(),
               response_status_text: response.statusText,
            },
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

export type SentryDetails = Exclude<Parameters<Scope['update']>[0], undefined>;

export class SentryError extends Error {
   constructor(message: string, readonly sentryDetails: SentryDetails = {}) {
      super(message);
   }
}

export function captureException(e: any, sentryDetails: SentryDetails) {
   Sentry.captureException(e, sentryDetails);
}
