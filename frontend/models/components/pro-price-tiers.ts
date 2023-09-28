import { printZodError } from '@helpers/zod-helpers';
import { z } from 'zod';
import { AlgoliaPriceTiers } from './algolia-product-hit';
import { CurrencyCode, moneyFromAmount, MoneySchema } from './money';

export type ProPriceTiers = z.infer<typeof ProPriceTiersSchema>;

export const ProPriceTiersSchema = z.record(MoneySchema);

export function proPriceTiersFromAlgoliaPriceTiers(
   priceTiers: AlgoliaPriceTiers | null | undefined
): ProPriceTiers | null {
   if (priceTiers == null) return null;

   const result: ProPriceTiers = {};
   for (const [tier, price] of Object.entries(priceTiers)) {
      result[tier] = moneyFromAmount(price.default_variant_price, 'USD');
   }
   return result;
}

const PriceTiersMetafieldSchema = z.record(z.number());

export function proPriceTiersFromPriceTiersMetafield(
   metafieldValue: unknown,
   currencyCode: CurrencyCode
): ProPriceTiers | null {
   if (typeof metafieldValue !== 'string') return null;

   const jsonValue: unknown = JSON.parse(metafieldValue);

   const validation = PriceTiersMetafieldSchema.safeParse(jsonValue);
   if (!validation.success) {
      console.error(
         `Invalid price tiers metafield value:`,
         printZodError(validation.error)
      );
      return null;
   }

   const result: ProPriceTiers = {};
   for (const [tier, price] of Object.entries(validation.data)) {
      result[tier] = moneyFromAmount(price, currencyCode);
   }
   return result;
}
