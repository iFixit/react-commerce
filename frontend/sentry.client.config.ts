// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN: string | undefined =
   process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;
const SENTRY_DEV_DSN =
   'https://95ab6917c0234f80b99bb0be8e720355@o186239.ingest.sentry.io/6475315';
const SENTRY_PROD_DSN =
   'https://003ddade86504df5aa49247ba36031e7@o186239.ingest.sentry.io/6469069';
const isProd =
   typeof window === 'undefined'
      ? process.env.NODE_ENV === 'production'
      : window.location.hostname === 'next.ifixit.com';
const fallbackDsn = isProd ? SENTRY_PROD_DSN : SENTRY_DEV_DSN;

Sentry.init({
   dsn: SENTRY_DSN || fallbackDsn,
   tracesSampleRate: isProd ? 1.0 : 0.0,
   // ...
   // Note: if you want to override the automatic release value, do not set a
   // `release` value here - use the environment variable `SENTRY_RELEASE`, so
   // that it will also get attached to your source maps
   initialScope: {
      tags: {
         'next.runtime': 'client',
      },
   },
});
