import { TrackingContext } from '@ifixit/tracking-hooks';
import { isError } from '@ifixit/helpers';
import { useIFixitApiClient } from '@ifixit/ifixit-api-client';
import * as React from 'react';

/**
 * A regex to validate email against simple mistakes
 */
export const EMAIL_VALIDATION_REGEX = /^\S+@\S+\.\S+$/;

export enum SubscriptionStatus {
   Idle = 'idle',
   Subscribing = 'subscribing',
   Subscribed = 'subscribed',
}

export interface Subscription {
   status: SubscriptionStatus;
   error?: string;
}

export interface SubscribeFn {
   (email: string): void;
}

export function useSubscribeToNewsletter(): [Subscription, SubscribeFn] {
   const client = useIFixitApiClient();
   const [state, setState] = React.useState<Subscription>({
      status: SubscriptionStatus.Idle,
   });

   const { trackClick } = React.useContext(TrackingContext);

   const subscribe = React.useCallback<SubscribeFn>(async (email) => {
      if (EMAIL_VALIDATION_REGEX.test(email)) {
         setState((current) => ({
            ...current,
            status: SubscriptionStatus.Subscribing,
         }));
         try {
            await client.post(
               'cart/newsletter/subscribe',
               'subscribe-to-newsletter',
               {
                  body: JSON.stringify({ email }),
               }
            );
            setState(() => ({
               status: SubscriptionStatus.Subscribed,
               error: undefined,
            }));
            trackClick({
               eventCategory: 'Newsletter',
               eventAction: 'Subscribe Form - Submit',
            });
         } catch (error) {
            let message: string;
            if (isError(error)) {
               message = 'Error trying to subscribe to newsletter.';
            }
            setState(() => ({
               status: SubscriptionStatus.Idle,
               error: message || 'server error',
            }));
         }
      } else {
         setState((current) => ({
            ...current,
            error: 'Please insert a valid email',
         }));
      }
   }, []);

   return [state, subscribe];
}
