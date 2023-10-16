import { AddToCartInput, CartLineItem } from '@ifixit/cart-sdk';
import { moneyToNumber, parseItemcode } from '@ifixit/helpers';
import debounce from 'lodash/debounce';
import { getShopifyStoreDomainFromCurrentURL } from '@ifixit/helpers';

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

type GTagItem = {
   item_id: string | null | undefined;
   item_name: string | null;
   item_variant: string | null;
   quantity: number | null | undefined;
   price: number;
};
type GTagItemsEvent = {
   items: GTagItem[];
   value: number;
   currency: string;
};
type GTagViewItemsListEvent = {
   items: GTagItem[];
   item_list_id: string;
   item_list_name: string;
};
type GTagArg = Array<any>;

export type GTag = (...args: GTagArg) => void;
declare global {
   interface Window {
      gtag?: GTag;
      dataLayer?: GTagArg;
   }
}

function gtag(...args: GTagArg) {
   if (typeof window !== 'undefined' && window.gtag) {
      window.gtag(...args);
   }
}

function windowGtag() {
   window?.dataLayer?.push(arguments);
}

export function setupMinimumGA4(
   GtagID: string | undefined,
   debugMode: boolean
) {
   if (typeof window !== 'undefined' && GtagID) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = windowGtag;
      window.gtag('js', new Date());
      window.gtag('config', GtagID, debugMode ? { debug_mode: true } : {});
      window.gtag('set', 'user_properties', getGACustomDimensions());
   }
}

export function trackGA4ViewItem(event: GTagItemsEvent) {
   gtag('event', 'view_item', event);
}

export function trackGA4ViewCart(event: GTagItemsEvent) {
   gtag('event', 'view_cart', event);
}

export function trackGA4AddToCart(event: GTagItemsEvent) {
   gtag('event', 'add_to_cart', event);
}

export function trackGA4RemoveFromCart(event: GTagItemsEvent) {
   gtag('event', 'remove_from_cart', event);
}

export function trackGA4ViewItemList(event: GTagViewItemsListEvent) {
   gtag('event', 'view_item_list', event);
}

export const debouncedTrackGA4ViewItemList: GTag = debounce(
   (event: GTagViewItemsListEvent) => {
      trackGA4ViewItemList(event);
   },
   500
);

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

type GACustomDimensions = {
   preferred_store: string;
   preferred_language: string;
};

export function getGACustomDimensions(): GACustomDimensions {
   return {
      preferred_store:
         getShopifyStoreDomainFromCurrentURL() || 'no-store-found',
      preferred_language: 'EN',
   };
}
