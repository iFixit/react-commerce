import {
   SentryDetails,
   SentryError,
   SentryErrorIntegration,
} from '@ifixit/sentry';
import * as Sentry from '@sentry/nextjs';

describe('Sentry SentryErrorIntegration', () => {
   it('should have extra information to the event', async () => {
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

      const mockBeforeSend = initSentry();

      // Trigger an exception to invoke the beforeSend callback
      Sentry.captureException(new SentryError('message', sentryDetails));

      // Flush the event to Sentry now
      const didFlush = await Sentry.flush();
      expect(didFlush).toBe(true);

      // Assert
      expect(mockBeforeSend).toHaveBeenCalledTimes(1);

      const event = mockBeforeSend.mock.calls[0][0];

      expect(event.contexts).toMatchObject(sentryDetails.contexts || {});
      expect(event.tags).toMatchObject(sentryDetails.tags || {});
   });
});

function initSentry(debug: boolean = false) {
   const mockBeforeSend = jest.fn();

   Sentry.init({
      debug,
      dsn: 'https://00000000000000000000000000000000@o000000.ingest.sentry.io/0000000',
      integrations: [new SentryErrorIntegration()],
      beforeSend: (event) => {
         mockBeforeSend(event);
         return event;
      },
   });

   return mockBeforeSend;
}
