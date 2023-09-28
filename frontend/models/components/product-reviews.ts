import { z } from 'zod';
import { AlgoliaProductHit } from './algolia-product-hit';

export type ProductReviews = z.infer<typeof ProductReviewsSchema>;

export const ProductReviewsSchema = z.object({
   rating: z.number(),
   count: z.number(),
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

export function productReviewsFromMetafields(
   ratingMetafieldValue: string | null | undefined,
   reviewsCountMetafieldValue: string | null | undefined
): ProductReviews | null {
   const rating = parseRatingMetafieldValue(ratingMetafieldValue);
   const count = parseReviewsCountMetafieldValue(reviewsCountMetafieldValue);
   if (rating == null || count == null) return null;
   return {
      rating,
      count,
   };
}

function parseRatingMetafieldValue(value: string | null | undefined) {
   if (value == null) {
      return null;
   }
   const rating = JSON.parse(value);
   return rating.value != null ? parseFloat(rating.value) : null;
}

function parseReviewsCountMetafieldValue(value: string | null | undefined) {
   if (value == null) {
      return null;
   }
   return value != null ? parseFloat(value) : null;
}
