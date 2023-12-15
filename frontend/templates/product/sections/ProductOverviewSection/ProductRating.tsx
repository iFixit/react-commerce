import { Box, HStack, Link, Text } from '@chakra-ui/react';
import { Rating } from '@components/ui';
import { shouldShowProductRating } from '@ifixit/helpers';
import type { Product } from '@pages/api/nextjs/cache/product';

type ProductRatingProps = {
   product: Product;
};

export function ProductRating({ product }: ProductRatingProps) {
   if (!shouldShowProductRating(product.reviews)) {
      return null;
   }

   return (
      <HStack mt="5" alignItems="unset">
         <Rating
            value={product.reviews.rating}
            aria-label={`Rated ${product.reviews.rating} out of 5 stars`}
            role="img"
         />
         <Text color="gray.600" aria-hidden={true}>
            {product.reviews.rating}
         </Text>
         <Box w="1px" bg="gray.300"></Box>

         <Link href="#reviews" color="gray.600">
            {product.reviews.count} reviews
         </Link>
      </HStack>
   );
}
