// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import { isCurrentProductionDeployment } from '@helpers/vercel-helpers';
import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
   dsn: SENTRY_DSN,
   sampleRate: 1.0,
   normalizeDepth: 5,
   // ...
   // Note: if you want to override the automatic release value, do not set a
   // `release` value here - use the environment variable `SENTRY_RELEASE`, so
   // that it will also get attached to your source maps
   initialScope: {
      tags: {
         'next.runtime': 'server',
      },
   },
   async beforeSend(event, hint) {
      const ex = hint.originalException;
      if (ex instanceof Error) {
         // Happens when receiving a bad url that fails to decode
         if (ex.message.match(/URI malformed/)) {
            return null;
         }
      }
      try {
         const current_production = await isCurrentProductionDeployment();
         event.tags = { ...event.tags, current_production };
      } catch (e) {
         event.extra = {
            ...event.extra,
            'Exception Checking Production Deployment': e,
         };
      }
      return event;
   },
});
