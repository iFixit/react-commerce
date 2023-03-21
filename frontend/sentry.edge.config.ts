import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN;

Sentry.init({
   debug: true,
   dsn: SENTRY_DSN,
   sampleRate: 1.0,
   normalizeDepth: 5,
   initialScope: {
      tags: {
         'next.runtime': 'edge',
      },
   },
});
