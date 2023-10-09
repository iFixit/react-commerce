import { SENTRY_SAMPLING_ENABLED, VERCEL_ENV } from '@config/env';
import { isCurrentProductionDeployment } from '@helpers/vercel-helpers';
import { BrowserTracing } from '@sentry/browser';
import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;
const sampleRate = SENTRY_SAMPLING_ENABLED
   ? VERCEL_ENV === 'production'
      ? 0.05
      : 0
   : 1.0;

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
   sampleRate,
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
