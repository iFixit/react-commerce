import {
   SentryDetails,
   SentryError,
   injectSentryErrorHandler,
} from '@ifixit/sentry';
import * as Sentry from '@sentry/nextjs';

describe('Sentry beforeSend', () => {
   it('should add extra information to the event', () => {
      const mockBeforeSend = initSentry();
      const sentryDetails: SentryDetails = {
         contexts: {
            contextName: {
               contextItem1: 'contextItem1',
               contextObj: {
                  name: 'contextObj',
               },
            },
         },
         tags: {
            tag1: 'Hello',
            tag2: 'Goodbye',
         },
      };
      Sentry.captureException(new SentryError('message', sentryDetails));

      expect(mockBeforeSend).toHaveBeenCalledTimes(1);

      const event = mockBeforeSend.mock.calls[0][0];

      expect(event.contexts).toMatchObject(sentryDetails.contexts || {});
      expect(event.tags).toMatchObject(sentryDetails.tags || {});
   });
});

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;
function initSentry() {
   const mockBeforeSend = jest.fn();

   Sentry.init({
      sampleRate: 1,
      dsn: SENTRY_DSN,
      beforeSend: (event) => {
         mockBeforeSend(event);
         return null;
      },
   });

   injectSentryErrorHandler();

   return mockBeforeSend;
}
