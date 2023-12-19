import debounce from 'lodash/debounce';
import {
   getShopifyStoreDomainFromCurrentURL,
   getShopifyLanguageFromCurrentURL,
} from '@ifixit/helpers';
import { useAuthenticatedUser } from '@ifixit/auth-sdk';
import { AnalyticsItem, AnalyticsItemsEvent } from '..';

type GTagViewItemsListEvent = {
   items: AnalyticsItem[];
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
   debugMode: boolean,
   dimensions: GACustomDimensions
) {
   if (typeof window !== 'undefined' && GtagID) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = windowGtag;
      window.gtag('js', new Date());
      window.gtag('config', GtagID, debugMode ? { debug_mode: true } : {});
      window.gtag('set', 'user_properties', dimensions);
   }
}

export function trackGA4ViewItem(event: AnalyticsItemsEvent) {
   gtag('event', 'view_item', event);
}

export function trackGA4ViewCart(event: AnalyticsItemsEvent) {
   gtag('event', 'view_cart', event);
}

export function trackGA4AddToCart(event: AnalyticsItemsEvent) {
   gtag('event', 'add_to_cart', event);
}

export function trackGA4RemoveFromCart(event: AnalyticsItemsEvent) {
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

type GACustomDimensions = {
   preferred_store: string;
   preferred_language: string;
};

export function useGACustomDimensions(): GACustomDimensions {
   const preferredLang = useAuthenticatedUser().data?.langid;

   return {
      preferred_store:
         getShopifyStoreDomainFromCurrentURL() || 'no-store-found',
      preferred_language:
         preferredLang?.toUpperCase() ||
         getShopifyLanguageFromCurrentURL() ||
         'no-language-found',
   };
}
