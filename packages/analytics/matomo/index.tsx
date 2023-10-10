import { CartLineItem } from '@ifixit/cart-sdk';
import {
   Money,
   getShopifyStoreDomainFromCurrentURL,
   sumMoney,
} from '@ifixit/helpers';
import { matomoPush } from './matomoPush';

/**
 * @see https://developer.matomo.org/api-reference/tracking-javascript
 */
export function trackMatomoPageView(url: string) {
   matomoPush(['setCustomUrl', url]);
   matomoPush(['setDocumentTitle', document.title]);
   matomoPush(['trackPageView']);
}

export function trackPiwikPreferredStore() {
   if (typeof window !== 'undefined') {
      const host = getShopifyStoreDomainFromCurrentURL();
      console.log('host', host);
      matomoPush(['setCustomDimension', 1, host]);
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

export function trackMatomoEcommerceView(product: ProductData) {
   matomoPush([
      'setEcommerceView',
      product.productSku,
      product.productName,
      product.categoryName,
      product.price.amount,
   ]);
}

export function trackMatomoCartChange(items: CartLineItem[]) {
   trackClearCart();
   if (items.length === 0) {
      return;
   }
   items.forEach((item) => {
      trackAddToCart({
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

/**
 * @see https://developer.matomo.org/api-reference/tracking-javascript
 * @see https://matomo.org/docs/ecommerce-analytics/#example-of-adding-a-product-to-the-order
 */
function trackAddToCart(product: AddToCartData) {
   matomoPush([
      'addEcommerceItem',
      product.productSku,
      product.productName,
      product.categoryName,
      product.price?.amount,
      product.quantity,
   ]);
}

function trackClearCart() {
   matomoPush(['clearEcommerceCart']);
}

function trackCartUpdated(grandTotal: Money) {
   matomoPush(['trackEcommerceCartUpdate', grandTotal.amount]);
}
