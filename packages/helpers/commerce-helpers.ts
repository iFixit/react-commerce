export function computeDiscountPercentage(
   price: number | Money,
   compareAtPrice?: number | Money | null
): number {
   if (compareAtPrice == null) {
      return 0;
   }
   const priceCents =
      typeof price === 'number' ? price : convertMoneyToCents(price);
   const compareAtPriceCents =
      typeof compareAtPrice === 'number'
         ? compareAtPrice
         : convertMoneyToCents(compareAtPrice);
   let percentage = 100 - (100 * priceCents) / compareAtPriceCents;
   percentage = Math.round(percentage);
   return percentage;
}

function convertMoneyToCents(money: Money): number {
   return moneyToNumber(money) * 100;
}

export type Money<T extends string | number = string | number> = {
   /** Numeric or string representation of money expressed as a decimal number (e.g. 39.99) */
   amount: T;
   /** Country currency code (e.g. usd) */
   currencyCode: string;
};

export function moneyToNumber(money: Money) {
   if (typeof money.amount === 'number') {
      return money.amount;
   }
   return parseFloat(money.amount);
}

export function formatMoney(money: Money) {
   const amount = moneyToNumber(money);
   const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: money.currencyCode,
   });
   return formatter.format(amount);
}

export function multiplyMoney(money: Money, multiplier: number): Money {
   const cents = convertMoneyToCents(money);
   const amount = (cents * multiplier) / 100;
   return {
      ...money,
      amount: amount.toFixed(2),
   };
}

export function sumMoney(moneys: Money[]): Money {
   const cents = moneys.reduce((sum, money) => {
      return sum + convertMoneyToCents(money);
   }, 0);
   const amount = cents / 100;
   return {
      ...moneys[0],
      amount: amount.toFixed(2),
   };
}

export function lessThan(a: Money, b: Money): boolean {
   return convertMoneyToCents(a) < convertMoneyToCents(b);
}
