// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN;

Sentry.init({
   dsn: SENTRY_DSN,
   sampleRate: 1.0,
   // ...
   // Note: if you want to override the automatic release value, do not set a
   // `release` value here - use the environment variable `SENTRY_RELEASE`, so
   // that it will also get attached to your source maps
   initialScope: {
      tags: {
         'next.runtime': 'server',
      },
   },
   beforeSend(event, hint) {
      const ex = hint.originalException;
      if (ex && typeof ex == 'object' && ex.message) {
         // Happens when receiving a bad url that fails to decode
         if (ex.message.match(/URI malformed/)) {
            return null;
         }
      }
      return event;
   },
});
