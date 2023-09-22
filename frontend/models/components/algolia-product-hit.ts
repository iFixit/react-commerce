import { z } from 'zod';

export type AlgoliaPriceTiers = z.infer<typeof AlgoliaPriceTiersSchema>;

export const AlgoliaPriceTiersSchema = z.record(
   z.object({
      default_variant_price: z.number(),
      min: z.number(),
      max: z.number(),
   })
);

export type AlgoliaProductHit = z.infer<typeof AlgoliaProductHitSchema>;

export const AlgoliaProductHitSchema = z.object({
   objectID: z.string(),
   productid: z.number().or(z.string()),
   productcode: z.number(),
   title: z.string(),
   handle: z.string(),
   image_url: z.string().nullable().optional(),
   price_float: z.number(),
   compare_at_price: z.number().nullable().optional(),
   price_tiers: AlgoliaPriceTiersSchema.nullable().optional(),
   lifetime_warranty: z.boolean().nullable().optional(),
   oem_partnership: z.string().nullable().optional(),
   is_pro: z.number().nullable().optional(),
   rating: z.number().nullable().optional(),
   rating_count: z.number().nullable().optional(),
   quantity_available: z.number().nullable().optional(),
});
