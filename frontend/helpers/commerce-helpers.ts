import { CurrencyCode, MoneyV2 } from '@lib/shopify-storefront-sdk';

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
   let textAmount: string;
   if (typeof money.amount === 'number') {
      textAmount = money.amount.toFixed(2);
   } else {
      textAmount = money.amount;
   }
   const formattedCurrency = formatCurrency(money.currencyCode);
   return `${formattedCurrency}${textAmount}`;
}

export function formatCurrency(currencyCode: CurrencyCode): string {
   switch (currencyCode) {
      case CurrencyCode.Usd: {
         return '$';
      }
      default: {
         return currencyCode;
      }
   }
}
