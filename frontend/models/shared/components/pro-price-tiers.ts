import { z } from 'zod';
import { AlgoliaPriceTiers } from './algolia-product-hit';
import { moneyFromAmount, MoneySchema } from './money';

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
