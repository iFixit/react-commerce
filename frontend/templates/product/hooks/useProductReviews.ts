import { useIFixitApiClient } from '@ifixit/ifixit-api-client';
import { fetchProductReviews, Product } from '@models/product';
import { useQuery } from 'react-query';

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
      {
         initialData: product.reviewsData,
         staleTime: Infinity, // Right now we're not interested in refreshing data client side
      }
   );
   return query;
}
