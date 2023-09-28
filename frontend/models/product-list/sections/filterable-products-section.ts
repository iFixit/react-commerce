import { z } from 'zod';

export type FilterableProductsSection = z.infer<
   typeof FilterableProductsSectionSchema
>;

export const FilterableProductsSectionSchema = z.object({
   type: z.literal('FilterableProducts'),
   id: z.string(),
});

export function filterableProductsSection(): FilterableProductsSection {
   return {
      type: 'FilterableProducts',
      id: 'filterable-products',
   };
}
