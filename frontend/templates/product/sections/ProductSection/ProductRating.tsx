import { Box, HStack, Link, Text } from '@chakra-ui/react';
import { Rating } from '@components/ui';
import { shouldShowProductRating } from '@ifixit/helpers';
import { Product, ProductReviewData } from '@models/product';

type ProductRatingProps = {
   product: Product;
   reviewsData: ProductReviewData;
};

export function ProductRating({ product, reviewsData }: ProductRatingProps) {
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

         <Link href="#reviews" color="gray.600">
            {reviews.reviewsCount} reviews
         </Link>
      </HStack>
   );
}
