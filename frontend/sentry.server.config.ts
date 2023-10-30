import { SENTRY_SAMPLING_ENABLED, VERCEL_ENV } from '@config/env';
import { isCurrentProductionDeployment } from '@helpers/vercel-helpers';
import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;
const sampleRate = SENTRY_SAMPLING_ENABLED
   ? VERCEL_ENV === 'production'
      ? 1.0
      : 0
   : 1.0;

Sentry.init({
   debug: true,
   dsn: SENTRY_DSN,
   sampleRate,
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
   environment: process.env.NODE_ENV,
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
         event.tags = { ...event.tags, before_send_error: true };
         event.extra = {
            ...event.extra,
            'Exception Checking Production Deployment': e,
         };
      }
      return event;
   },
});
