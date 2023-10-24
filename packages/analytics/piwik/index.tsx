import {
   Money,
   getShopifyStoreDomainFromCurrentURL,
   getShopifyLanguageFromCurrentURL,
   sumMoney,
} from '@ifixit/helpers';
import { piwikPush } from './piwikPush';
import { AddToCartInput, CartLineItem } from '@ifixit/cart-sdk';
import { trackInPiwik } from './track-event';

/**
 * @see https://developer.matomo.org/api-reference/tracking-javascript
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

/**
 * @see https://developer.matomo.org/api-reference/tracking-javascript
 * @see https://matomo.org/docs/ecommerce-analytics/#tracking-product-views-in-matomo
 */
type ProductData = {
   productSku: string;
   productName?: string;
   /**
    * Category name, or up to five unique categories, e.g. ["Books", "New
    * Releases", "Technology"]
    */
   categoryName?: string | [string, string?, string?, string?, string?];
   price: Money;
};

export function trackPiwikEcommerceView(product: ProductData) {
   piwikPush([
      'setEcommerceView',
      product.productSku,
      product.productName,
      product.categoryName,
      product.price.amount,
   ]);
}

export function trackPiwikCartChange(items: CartLineItem[]) {
   trackClearCart();
   if (items.length === 0) {
      return;
   }
   items.forEach((item) => {
      trackAddItemToCart({
         productSku: item.itemcode,
         productName: item.internalDisplayName,
         price: item.price,
         quantity: item.quantity,
      });
   });

   const totalPrice = sumMoney(items.map((i) => i.price));
   trackCartUpdated(totalPrice);
}

/**
 * @see https://developer.matomo.org/api-reference/tracking-javascript
 * @see https://matomo.org/docs/ecommerce-analytics/#example-of-adding-a-product-to-the-order
 */
type AddToCartData = {
   productSku: string;
   productName?: string;
   /**
    * Category name, or up to five unique categories, e.g. ["Books", "New
    * Releases", "Technology"]
    */
   categoryName?: string | [string, string?, string?, string?, string?];
   price?: Money;
   /**
    * How many of this item to add (Defaults to 1)
    */
   quantity?: number;
};

export function trackPiwikAddToCart(
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

/**
 * @see https://developer.matomo.org/api-reference/tracking-javascript
 * @see https://matomo.org/docs/ecommerce-analytics/#example-of-adding-a-product-to-the-order
 */
function trackAddItemToCart(product: AddToCartData) {
   piwikPush([
      'addEcommerceItem',
      product.productSku,
      product.productName,
      product.categoryName,
      product.price?.amount,
      product.quantity,
   ]);
}

function trackClearCart() {
   piwikPush(['clearEcommerceCart']);
}

function trackCartUpdated(grandTotal: Money) {
   piwikPush(['trackEcommerceCartUpdate', grandTotal.amount]);
}

type PiwikCustomDimensions = {
   preferredStore: number;
   preferredLanguage: number;
};

function getPiwikCustomDimensionsForEnv(
   env: string | undefined
): PiwikCustomDimensions | null {
   switch (env) {
      case 'prod':
         return {
            preferredStore: 1,
            preferredLanguage: 2,
         };
      case 'dev':
         return {
            preferredStore: 1,
            preferredLanguage: 2,
         };
      default:
         return null;
   }
}
