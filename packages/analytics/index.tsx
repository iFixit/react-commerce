import { AddToCartInput, Cart, CartLineItem } from '@ifixit/cart-sdk';
import {
   trackGA4AddToCart,
   trackGA4RemoveFromCart,
   trackGA4ViewCart,
   trackGA4ViewItem,
   trackGA4ViewItemList,
} from './google';
import {
   trackPiwikCartUpdate,
   trackPiwikV2AddToCart,
   trackPiwikV2ProductDetailView,
   trackPiwikV2RemoveFromCart,
} from './piwik';
import { getVariantIdFromVariantURI } from '@ifixit/helpers';

export * from './google';
export * from './piwik';

export type AnalyticsItem = {
   item_id: string | null | undefined;
   item_name: string | null;
   item_variant: string | null;
   quantity: number | null | undefined;
   price: number;
};
export type AnalyticsItemsEvent = {
   items: AnalyticsItem[];
   value: number;
   currency: string;
};

export function trackInAnalyticsViewItem(event: AnalyticsItemsEvent) {
   trackGA4ViewItem(event);
   trackPiwikV2ProductDetailView(event.items);
}

export function trackInAnalyticsAddToCart(event: AnalyticsItemsEvent) {
   trackGA4AddToCart(event);
   trackPiwikV2AddToCart(event.items);
}

export function trackInAnalyticsRemoveFromCart(event: AnalyticsItemsEvent) {
   trackGA4RemoveFromCart(event);
   trackPiwikV2RemoveFromCart(event.items);
}

export function convertAddToCartInputToAnalyticsItemEvent(
   input: AddToCartInput
): AnalyticsItemsEvent {
   if (input.type === 'product') {
      return {
         items: convertCartLineItemsToAnalyticsItem([input.product]),
         value: Number(input.product.price.amount),
         currency: input.product.price.currencyCode,
      };
   } else {
      return {
         items: convertCartLineItemsToAnalyticsItem(input.bundle.items),
         value: input.bundle.items.reduce(
            (acc, item) => acc + Number(item.price.amount),
            0
         ),
         currency: input.bundle.items[0].price.currencyCode,
      };
   }
}

export function convertCartLineItemsToAnalyticsItem(
   items: CartLineItem[]
): AnalyticsItem[] {
   return items.map((item) => {
      return {
         item_id: item.itemcode,
         item_name: `${item.name} - ${item.variantTitle}`,
         item_variant: getVariantIdFromVariantURI(item.shopifyVariantId),
         quantity: item.quantity,
         price: Number(item.price.amount),
      };
   });
}
