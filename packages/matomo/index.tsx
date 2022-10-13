import { CartLineItem } from '@ifixit/cart-sdk';
import { Money, sumMoney } from '@ifixit/helpers';

const _paq: any[] | undefined =
   typeof window === 'undefined' ? undefined : (window as any)._paq;

/**
 * @see https://developer.matomo.org/api-reference/tracking-javascript
 */
export function trackPageView(url: string) {
   if (!_paq) {
      return;
   }
   _paq.push(['setCustomUrl', url]);
   _paq.push(['setDocumentTitle', document.title]);
   _paq.push(['trackPageView']);
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
   if (!_paq) {
      return;
   }
   _paq.push([
      'setEcommerceView',
      product.productSku,
      product.productName,
      product.categoryName,
      product.price.amount,
   ]);
}

export function trackMatomoCartChange(items: CartLineItem[]) {
   if (!_paq) {
      return;
   }
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
   if (!_paq) {
      return;
   }
   _paq.push([
      'addEcommerceItem',
      product.productSku,
      product.productName,
      product.categoryName,
      product.price?.amount,
      product.quantity,
   ]);
}

function trackClearCart() {
   if (!_paq) {
      return;
   }
   _paq.push(['clearEcommerceCart']);
}

function trackCartUpdated(grandTotal: Money) {
   if (!_paq) {
      return;
   }
   _paq.push(['trackEcommerceCartUpdate', grandTotal.amount]);
}
