import { Box, HStack, Text } from '@chakra-ui/react';
import { Rating } from '@components/ui';
import { shouldShowProductRating } from '@ifixit/helpers';
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
      <HStack mt="5" alignItems="unset">
         <Rating value={reviews.rating} />
         <Text color="gray.600">{reviews.rating}</Text>
         <Box w="1px" bg="gray.300"></Box>
         <Text color="gray.600">{reviews.reviewsCount} reviews</Text>
      </HStack>
   );
}
