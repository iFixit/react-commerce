import { z } from 'zod';

export const ProductListRedirectToTypeSchema = z.enum([
   'Permanent',
   'Temporary',
]);
export type ProductListRedirectToType = z.infer<
   typeof ProductListRedirectToTypeSchema
>;
