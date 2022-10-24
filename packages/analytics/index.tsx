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
   addToCartInput: AddToCartInput
) {
   trackMatomoCartChange(cart);
   trackGoogleAddToCart(addToCartInput);
   if (addToCartInput.type === 'bundle') {
      addToCartInput.bundle.items.forEach((item) =>
         trackAddItemToCartEvent(item)
      );
   } else if (addToCartInput.type === 'product') {
      trackAddItemToCartEvent(addToCartInput.product);
   }
}

function trackAddItemToCartEvent(item: CartLineItem) {
   const actionSuffix = item.internalDisplayName
      ? ` - ${item.internalDisplayName}`
      : '';
   trackInMatomoAndGA({
      eventCategory: 'Add to Cart',
      eventAction: `${item.itemcode}${actionSuffix}`,
   });
}
