// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import { isCurrentProductionDeployment } from '@helpers/vercel-helpers';
import * as Sentry from '@sentry/nextjs';
import { BrowserTracing } from '@sentry/browser';

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
   async beforeSend(event) {
      try {
         const current_production = await isCurrentProductionDeployment();
         event.tags = { ...event.tags, current_production };
      } catch (e) {
         event.tags = { ...event.tags, before_send_error: true };
         event.extra = {
            ...event.extra,
            'Exception Checking Production Deployment': e,
         };
      }
      return event;
   },
   dsn: SENTRY_DSN,
   integrations: [new BrowserTracing()],
   sampleRate: 1.0,
   normalizeDepth: 5,
   tracesSampleRate: 0.05,
   environment: process.env.NODE_ENV,
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
});
