import { Box, HStack, Link, Text } from '@chakra-ui/react';
import { Rating } from '@components/ui';
import { shouldShowProductRating } from '@ifixit/helpers';
import type { Product } from '@pages/api/nextjs/cache/product';

type ProductRatingProps = {
   product: Product;
};

export function ProductRating({ product }: ProductRatingProps) {
   const rating = product?.rating?.value;
   const count = product?.reviewsCount;

   if (rating == null || count == null) return null;

   if (!shouldShowProductRating({ rating, count })) {
      return null;
   }

   return (
      <HStack mt="5" alignItems="unset">
         <Rating value={rating} />
         <Text color="gray.600">{rating}</Text>
         <Box w="1px" bg="gray.300"></Box>

         <Link href="#reviews" color="gray.600">
            {count} reviews
         </Link>
      </HStack>
   );
}
