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
   trackMatomoCartChange(cart);
   trackGoogleAddToCart(addToCartInput);
   if (addToCartInput.type === 'bundle') {
      addToCartInput.bundle.items.forEach((item) =>
         trackAddItemToCartEvent(item, message)
      );
   } else if (addToCartInput.type === 'product') {
      trackAddItemToCartEvent(addToCartInput.product, message);
   }
}

function trackAddItemToCartEvent(item: CartLineItem, message?: string) {
   const actionPrefix = message ? `${message} - ` : '';
   const actionSuffix = item.internalDisplayName
      ? ` - ${item.internalDisplayName}`
      : '';
   trackInMatomoAndGA({
      eventCategory: 'Add to Cart',
      eventAction: `${actionPrefix}${item.itemcode}${actionSuffix}`,
   });
}
