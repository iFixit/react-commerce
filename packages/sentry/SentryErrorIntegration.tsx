import { SentryError } from '.';
import * as Sentry from '@sentry/nextjs';
import {
   BaseTransportOptions,
   Client,
   ClientOptions,
   EventProcessor,
   Hub,
   Integration,
} from '@sentry/types';

export class SentryErrorIntegration implements Integration {
   static id = 'SentryErrorIntegration';
   name = 'SentryErrorIntegration';
   setupOnce(
      _addGlobalEventProcessor: (callback: EventProcessor) => void,
      _getCurrentHub: () => Hub
   ): void {}
   processEvent?(
      event: Sentry.Event,
      hint: Sentry.EventHint,
      client: Client<ClientOptions<BaseTransportOptions>>
   ): Sentry.Event | PromiseLike<Sentry.Event | null> | null {
      const exception = hint.originalException;

      if (exception instanceof SentryError) {
         const currentScope = Sentry.getCurrentHub().getScope();
         const newScope = Sentry.Scope.clone(currentScope);

         newScope.update(exception.sentryDetails);
         newScope.applyToEvent(event, hint);
      }

      return event;
   }

   isDefaultInstance = true;
}
