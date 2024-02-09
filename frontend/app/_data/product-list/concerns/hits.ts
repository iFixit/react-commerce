import { z } from 'zod';

export type ProductListType =
   | 'parts'
   | 'tools'
   | 'device-parts'
   | 'tools-category'
   | 'marketing';

const PriceTierSchema = z.object({
   default_variant_price: z.union([z.string(), z.number()]),
   min: z.union([z.string(), z.number()]),
   max: z.union([z.string(), z.number()]),
});

export type PriceTier = z.infer<typeof PriceTierSchema>;

export const ProductSearchHitSchema = z.object({
   objectID: z.string(),
   title: z.string(),
   handle: z.string(),
   price_float: z.number(),
   compare_at_price: z.number().optional(),
   price_tiers: z.record(PriceTierSchema).optional(),
   sku: z.string(),
   image_url: z.string(),
   short_description: z.string().optional(),
   quantity_available: z.number(),
   lifetime_warranty: z.boolean(),
   oem_partnership: z.string().nullable(),
   rating: z.number(),
   rating_count: z.number(),
   url: z.string(),
   is_pro: z.number(),
});

export type ProductSearchHit = z.infer<typeof ProductSearchHitSchema>;
