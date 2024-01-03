import { z } from 'zod';

export const ProductListRedirectToType = z.enum(['Permanent', 'Temporary']);
export type TProductListRedirectToType = z.infer<
   typeof ProductListRedirectToType
>;
