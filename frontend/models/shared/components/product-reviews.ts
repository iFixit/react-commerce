import { z } from 'zod';
import { AlgoliaProductHit } from './algolia-product-hit';

export type ProductReviews = z.infer<typeof ProductReviewsSchema>;

export const ProductReviewsSchema = z.object({
   rating: z.number(),
   count: z.number().nullable(),
});

export function productReviewsFromAlgoliaProductHit(
   hit: AlgoliaProductHit
): ProductReviews | null {
   if (typeof hit.rating !== 'number' || typeof hit.rating_count !== 'number')
      return null;
   return {
      rating: hit.rating,
      count: hit.rating_count,
   };
}
