import { trackInMatomoAndGA } from '@ifixit/analytics';
import { useAppContext } from '@ifixit/app';
import { isError } from '@ifixit/helpers';
import { sentryFetch } from '@ifixit/sentry';
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
   const appContext = useAppContext();
   const [state, setState] = React.useState<Subscription>({
      status: SubscriptionStatus.Idle,
   });

   const subscribe = React.useCallback<SubscribeFn>(async (email) => {
      if (EMAIL_VALIDATION_REGEX.test(email)) {
         setState((current) => ({
            ...current,
            status: SubscriptionStatus.Subscribing,
         }));
         try {
            await subscribeToNewsletter(appContext.ifixitOrigin, email);
            setState(() => ({
               status: SubscriptionStatus.Subscribed,
               error: undefined,
            }));
            trackInMatomoAndGA({
               eventCategory: 'Newsletter',
               eventAction: `Subscribe Form - Submit`,
            });
         } catch (error) {
            let message: string;
            if (isError(error)) {
               message = error.message;
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

/**
 * Subscribe an email to the newsletter
 * @param email The email to subscribe
 */
export async function subscribeToNewsletter(
   apiOrigin: string,
   email: string
): Promise<void> {
   const response = await sentryFetch(
      `${apiOrigin}/api/2.0/cart/newsletter/subscribe`,
      {
         method: 'POST',
         body: JSON.stringify({
            email,
         }),
      }
   );
   if (response.status >= 300) {
      const error = await response.text();
      console.error('Subscribe to newsletter error:', error);
      throw new Error('Error trying to subscribe to newsletter.');
   }
}
