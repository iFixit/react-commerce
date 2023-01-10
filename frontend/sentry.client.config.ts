// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';
import { BrowserTracing } from '@sentry/tracing';

const SENTRY_DSN = process.env.SENTRY_DSN;

const hydrationErrors = [
   'Hydration failed because the initial UI does not match what was rendered on the server.',
   'Text content does not match server-rendered HTML.',
   'There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering.',
];

Sentry.init({
   dsn: SENTRY_DSN,
   integrations: [new BrowserTracing()],
   sampleRate: 1.0,
   normalizeDepth: 5,
   tracesSampleRate: 0.005,
   // ...
   // Note: if you want to override the automatic release value, do not set a
   // `release` value here - use the environment variable `SENTRY_RELEASE`, so
   // that it will also get attached to your source maps
   initialScope: {
      tags: {
         'next.runtime': 'client',
      },
   },
   ignoreErrors: [
      'TypeError: NetworkError when attempting to fetch resource.',
      'TypeError: Network request failed',
      // Algolia error when network requests fail.
      // Only happens on iOS devices (across all browsers)
      'RetryError: Unreachable hosts - your application id may be incorrect',
      // Can't reproduce, promise rejection with an instance of a CustomEvent
      // is unhandled.
      // Only happens on Macs, mostly Chrome, but some on safari
      'CustomEvent: Non-Error promise rejection captured with keys: currentTarget, detail, isTrusted, target',
   ],
   beforeSend: (event, hint) => {
      const ex = hint.originalException;
      if (ex && typeof ex == 'object' && ex.message) {
         // Sample hydration errors.
         if (hydrationErrors.includes(ex.message)) {
            return Math.random() < 0.05 ? event : null;
         }
      }
      return event;
   },
});
