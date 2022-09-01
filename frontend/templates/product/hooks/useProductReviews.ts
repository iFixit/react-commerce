import { useAppContext } from '@ifixit/app';
import { fetchProductReviews, Product } from '@models/product';
import { useQuery } from 'react-query';

const productReviewsKeys = {
   reviews(productId: string) {
      return ['product-reviews', productId];
   },
};

export function useProductReviews(product: Product) {
   const appContext = useAppContext();
   const query = useQuery(
      productReviewsKeys.reviews(product.iFixitProductId),
      () =>
         fetchProductReviews(appContext.ifixitOrigin, product.iFixitProductId),
      {
         initialData: product.reviewsData,
         staleTime: Infinity, // Right now we're not interested in refreshing data client side
      }
   );
   return query;
}
