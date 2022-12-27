import { useIFixitApiClient } from '@ifixit/ifixit-api-client';
import { fetchProductReviews } from '@models/product';
import type { Product } from '@models/product.server';
import { useQuery } from '@tanstack/react-query';

const productReviewsKeys = {
   reviews(productId: string) {
      return ['product-reviews', productId];
   },
};

export function useProductReviews(product: Product) {
   const apiClient = useIFixitApiClient();
   const query = useQuery(
      productReviewsKeys.reviews(product.iFixitProductId),
      () => fetchProductReviews(apiClient, product.iFixitProductId),
      { staleTime: Infinity }
   );
   return query;
}
