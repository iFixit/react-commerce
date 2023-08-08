import { z } from 'zod';

export type ProductListChildrenSection = z.infer<
   typeof ProductListChildrenSectionSchema
>;

export const ProductListChildrenSectionSchema = z.object({
   type: z.literal('ProductsListChildren'),
   id: z.string(),
});

export function productListChildrenSection(): ProductListChildrenSection {
   return {
      type: 'ProductsListChildren',
      id: 'product-list-children',
   };
}
