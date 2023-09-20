import { AddToCartInput, CartLineItem } from '@ifixit/cart-sdk';
import { moneyToNumber, parseItemcode } from '@ifixit/helpers';
import debounce from 'lodash/debounce';

type GAType = (metric: string, ...args: any) => void;
type GAProductType = {
   id: string;
   /**
    * The generic product name.
    */
   name: string;
   /**
    * The specific product option selected.
    */
   variant?: string;
   category?: string;
   price: string;
};
type GATrackEvent = {
   /**
    * Describes the type of events you want to track.
    * For example, Link Clicks, Videos, Outbound Links, and Form Events.
    */
   category: string;
   /**
    * The specific action that is taken.
    * For example, with a Video category, you might have a Play, Pause and Complete action.
    */
   action: string;
   /**
    * Usually the title of the element that is being interacted with, to aid with analysis.
    * For example, it could be the name of a Video that was played or the specific
    * form that is being submitted.
    */
   name?: string;
};

type GTagArg = Array<any>;
type EventObj = { [key: string]: any };
export type GTag = (...args: GTagArg) => void;

declare global {
   interface Window {
      gtag?: GTag;
      dataLayer?: GTagArg;
   }
}

function gtag(...args: GTagArg) {
   if (window.gtag) {
      window.gtag(...args);
   }
}

export function trackGA4ViewItem(event: EventObj) {
   gtag('event', 'view_item', event);
}

export function trackGA4ViewCart(event: EventObj) {
   gtag('event', 'view_cart', event);
}

export function trackGA4AddToCart(event: EventObj) {
   gtag('event', 'add_to_cart', event);
}

export function trackGA4RemoveFromCart(event: EventObj) {
   gtag('event', 'remove_from_cart', event);
}

export function trackGA4ViewItemList(event: EventObj) {
   gtag('event', 'view_item_list', event);
}

export const debouncedTrackGA4ViewItemList = debounce((event: EventObj) => {
   trackGA4ViewItemList(event);
}, 500);

export function trackGoogleProductView(product: GAProductType) {
   const ga = useGa();
   if (!ga) {
      return;
   }
   ga('ifixit.ec:addProduct', product);
   ga('ifixit.ec:setAction', 'detail');
   ga('ifixit.send', 'pageview');
}

export function trackGoogleAddToCart(addToCartInput: AddToCartInput) {
   const ga = useGa();
   if (!ga) {
      return;
   }
   if (addToCartInput.type === 'bundle') {
      addToCartInput.bundle.items.forEach((item) =>
         trackAddProductData(item, ga)
      );
   } else if (addToCartInput.type === 'product') {
      trackAddProductData(addToCartInput.product, ga);
   }
   ga('ifixit.ec:setAction', 'add');
}

function trackAddProductData(item: CartLineItem, ga: GAType) {
   const { category } = parseItemcode(item.itemcode);
   const addProductData: GAProductType & { quantity: number } = {
      id: item.itemcode,
      name: item.name,
      variant: item.internalDisplayName,
      category,
      price: moneyToNumber(item.price).toFixed(2),
      quantity: item.quantity,
   };
   ga('ifixit.ec:addProduct', addProductData);
}

export function gaSendEvent(event: GATrackEvent) {
   const ga = useGa();
   if (!ga) {
      return;
   }
   const name =
      event.name || `${window.location.origin}${window.location.pathname}`;
   ga('ifixit.send', 'event', event.category, event.action, name);
}

function useGa(): GAType | undefined {
   if (typeof window === 'undefined') {
      return undefined;
   }
   return (window as any).ga;
}
