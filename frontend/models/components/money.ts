import { toNumber } from '@helpers/zod-helpers';
import { z } from 'zod';

export type CurrencyCode = z.infer<typeof CurrencyCodeSchema>;

export const CurrencyCodeSchema = z.enum(['USD']);

export type Money = z.infer<typeof MoneySchema>;

export const MoneySchema = z.object({
   amount: z.preprocess(toNumber, z.number()),
   currencyCode: CurrencyCodeSchema,
});

export function moneyFromAmount(amount: number, code: CurrencyCode): Money;
export function moneyFromAmount(
   amount: number | null | undefined,
   code?: CurrencyCode | null
): Money | null;
export function moneyFromAmount(
   amount: number | null | undefined,
   code?: CurrencyCode | null
): Money | null {
   if (amount == null || code == null) return null;
   return {
      amount,
      currencyCode: code,
   };
}
