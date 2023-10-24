import { AddToCartInput, CartLineItem } from '@ifixit/cart-sdk';
import { trackPiwikCartChange } from './piwik';
import { trackInPiwik } from './piwik/track-event';

export * from './google';
export * from './piwik';

export function trackAddToCart(
   cart: CartLineItem[],
   addToCartInput: AddToCartInput,
   eventSpecification?: string
) {
   trackPiwikCartChange(cart);
   const event =
      `Add to Cart` + (eventSpecification ? ` - ${eventSpecification}` : '');
   const itemcodes =
      addToCartInput.type === 'product'
         ? addToCartInput.product.itemcode
         : `${addToCartInput.bundle.currentItemCode}/` +
           `${addToCartInput.bundle.items
              .map((item) => item.itemcode)
              .join(', ')}`;
   trackInPiwik({
      eventCategory: event,
      eventAction: `${event} - ${itemcodes}`,
      eventName: `${window.location.origin}${window.location.pathname}`,
   });
}
