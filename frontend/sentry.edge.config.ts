import { isCurrentProductionDeployment } from '@helpers/vercel-helpers';
import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
   async beforeSend(event) {
      const current_production = await isCurrentProductionDeployment();
      event.tags = { ...event.tags, current_production };
      return event;
   },
   dsn: SENTRY_DSN,
   initialScope: {
      tags: {
         'next.runtime': 'edge',
      },
   },
});
