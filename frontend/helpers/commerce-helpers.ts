import { MoneyV2 } from '@lib/shopify-storefront-sdk';

export function computeDiscountPercentage(
   priceCents: number,
   compareAtPriceCents: number
): number {
   let percentage = 100 - (100 * priceCents) / compareAtPriceCents;
   percentage = Math.round(percentage);
   return percentage;
}

export type ShopifyPrice = Pick<MoneyV2, 'amount' | 'currencyCode'>;

export function formatShopifyPrice(money: ShopifyPrice) {
   let amount: number;
   if (typeof money.amount === 'number') {
      amount = money.amount;
   } else {
      amount = parseFloat(money.amount);
   }
   const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: money.currencyCode,
   });
   return formatter.format(amount);
}
