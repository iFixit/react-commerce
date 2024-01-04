import {
   getShopifyStoreDomainFromCurrentURL,
   getShopifyLanguageFromCurrentURL,
} from '@ifixit/helpers';
import { piwikPush } from './piwikPush';
import { AddToCartInput } from '@ifixit/cart-sdk';
import { trackInPiwik } from './track-event';
import { AnalyticsItem, AnalyticsItemsEvent } from '..';

/**
 * @see https://developers.piwik.pro/en/latest/data_collection/web/javascript_tracking_client/api.html
 */
export function trackPiwikPageView(url: string) {
   piwikPush(['setCustomUrl', url]);
   piwikPush(['setDocumentTitle', document.title]);
   piwikPush(['trackPageView']);
}

export function trackPiwikPreferredStore(piwikEnv: string | undefined): void {
   const customDimensions = getPiwikCustomDimensionsForEnv(piwikEnv);
   if (typeof window !== 'undefined' && customDimensions) {
      const host = getShopifyStoreDomainFromCurrentURL();
      piwikPush([
         'setCustomDimensionValue',
         customDimensions['preferredStore'],
         host,
      ]);
   }
}

export function trackPiwikPreferredLanguage(
   piwikEnv: string | undefined,
   preferredLang: string | null
): void {
   const customDimensions = getPiwikCustomDimensionsForEnv(piwikEnv);
   if (typeof window !== 'undefined' && customDimensions) {
      const lang =
         preferredLang?.toUpperCase() ?? getShopifyLanguageFromCurrentURL();
      piwikPush([
         'setCustomDimensionValue',
         customDimensions['preferredLanguage'],
         lang,
      ]);
   }
}

export function trackPiwikUserPrivilege(
   piwikEnv: string | undefined,
   userPrivilege: string | null
): void {
   const customDimensions = getPiwikCustomDimensionsForEnv(piwikEnv);
   if (typeof window !== 'undefined' && customDimensions && userPrivilege) {
      piwikPush([
         'setCustomDimensionValue',
         customDimensions['userPrivilege'],
         userPrivilege,
      ]);
   }
}

export function trackPiwikV2ProductDetailView(items: AnalyticsItem[]) {
   piwikPush(['ecommerceProductDetailView', items.map(formatProduct)]);
}

export function trackPiwikV2AddToCart(items: AnalyticsItem[]) {
   piwikPush(['ecommerceAddToCart', items.map(formatProduct)]);
}

export function trackPiwikV2RemoveFromCart(items: AnalyticsItem[]) {
   piwikPush(['ecommerceRemoveFromCart', items.map(formatProduct)]);
}

export function trackPiwikCartUpdate(event: AnalyticsItemsEvent) {
   piwikPush([
      'ecommerceCartUpdate',
      event.items.map(formatProduct),
      event.value.toString(),
   ]);
}

export function trackPiwikCustomAddToCart(
   addToCartInput: AddToCartInput,
   eventSpecification?: string
) {
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

type PiwikCustomDimensions = {
   preferredStore: number;
   preferredLanguage: number;
   userPrivilege: number;
};

function getPiwikCustomDimensionsForEnv(
   env: string | undefined
): PiwikCustomDimensions | null {
   switch (env) {
      case 'prod':
         return {
            preferredStore: 1,
            preferredLanguage: 2,
            userPrivilege: 3,
         };
      case 'dev':
         return {
            preferredStore: 1,
            preferredLanguage: 2,
            userPrivilege: 3,
         };
      default:
         return null;
   }
}

function formatProduct(item: AnalyticsItem) {
   return {
      sku: item.item_id,
      name: item.item_name,
      price: item.price.toString(),
      quantity: item.quantity,
      variant: item.item_variant,
   };
}
