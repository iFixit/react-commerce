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

export function printZodError(error: z.ZodError, title?: string) {
   const validationError = JSON.stringify(error.format(), null, 2);
   return title ? `${title}: ${validationError}` : validationError;
}
