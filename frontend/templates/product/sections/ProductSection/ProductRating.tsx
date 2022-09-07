import { HStack, Text } from '@chakra-ui/react';
import { Rating } from '@components/ui';
import { shouldShowProductRating } from '@helpers/product-helpers';
import { Product } from '@models/product';
import { useProductReviews } from '../../hooks/useProductReviews';

type ProductRatingProps = {
   product: Product;
};

export function ProductRating({ product }: ProductRatingProps) {
   const reviewsQuery = useProductReviews(product);
   const reviewsData = reviewsQuery.data;
   const reviews = {
      rating: reviewsData?.average,
      reviewsCount: reviewsData?.count,
   };

   if (!shouldShowProductRating(reviews)) {
      return null;
   }

   return (
      <HStack mt="5">
         <Rating value={reviews.rating} />
         <Text color="gray.600">{reviews.rating}</Text>
         <Text color="gray.600" textDecoration="underline">
            {reviews.reviewsCount} reviews
         </Text>
      </HStack>
   );
}
