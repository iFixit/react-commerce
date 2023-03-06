import { z } from 'zod';

export function toNumber(value: unknown): number | null {
   if (typeof value === 'number') {
      return value;
   }
   if (typeof value === 'string') {
      const parsedValue = parseFloat(value);
      if (!isNaN(parsedValue)) {
         return parsedValue;
      }
   }
   return null;
}

export const printZodError = (error: z.ZodError) => {
   return JSON.stringify(error.format(), null, 2);
};
