import { AddToCartInput, CartLineItem } from '@ifixit/cart-sdk';
import { gaSendEvent, trackGoogleAddToCart } from './google';
import { trackMatomoCartChange } from './matomo';
import { TrackEventMatomo, trackInMatomo } from './matomo/track-event';

export * from './google';
export * from './matomo';

/**
 * @param trackData trackData.eventName will default to the page path if not provided
 */
export const trackInMatomoAndGA = (trackData: TrackEventMatomo) => {
   if (typeof window === 'undefined') {
      return;
   }
   const eventName =
      trackData.eventName ||
      `${window.location.origin}${window.location.pathname}`;
   trackInMatomo({
      ...trackData,
      eventName,
   });
   gaSendEvent({
      category: trackData.eventCategory,
      action: trackData.eventAction,
      name: eventName,
   });
};

export function trackAddToCart(
   cart: CartLineItem[],
   addToCartInput: AddToCartInput,
   message?: string
) {
   if (typeof window === 'undefined') {
      return;
   }
   trackMatomoCartChange(cart);
   trackGoogleAddToCart(addToCartInput);
   const actionPrefix = message ? `${message} - ` : '';
   const itemcodes =
      addToCartInput.type === 'product'
         ? addToCartInput.product.itemcode
         : addToCartInput.bundle.items.map((item) => item.itemcode).join(', ');
   trackInMatomoAndGA({
      eventCategory: 'Add to Cart',
      eventAction: `${actionPrefix}${itemcodes}`,
      eventName: `${window.location.origin}${window.location.pathname}`,
   });
}
