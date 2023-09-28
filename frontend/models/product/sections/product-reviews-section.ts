import { z } from 'zod';

export type ProductReviewsSection = z.infer<typeof ProductReviewsSectionSchema>;

export const ProductReviewsSectionSchema = z.object({
   type: z.literal('ProductReviews'),
   id: z.string(),
   title: z.string().nullable(),
});
