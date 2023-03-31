import { Box, Button, Flex, HStack, Link, Text } from '@chakra-ui/react';
import { Rating } from '@components/ui';
import { shouldShowProductRating } from '@ifixit/helpers';
import { Wrapper } from '@ifixit/ui';

interface AddToCartBarProps {
   title: string;
   rating?: number | null;
   reviewsCount?: number | null;
   active?: boolean;
}

export function AddToCartBar({
   title,
   rating,
   reviewsCount,
   active = false,
}: AddToCartBarProps) {
   return (
      <Box
         position="fixed"
         zIndex="overlay"
         bg="white"
         bottom="0"
         left="0"
         right="0"
         py="2.5"
         borderColor="gray.200"
         borderTopWidth="1px"
         transform="auto"
         translateY={active ? '0' : '100%'}
         transition="transform 300ms"
      >
         <Wrapper>
            <HStack justify="space-between">
               <Flex flexDir="column">
                  <Text fontSize="md" noOfLines={1}>
                     {title}
                  </Text>
                  <ProductRating rating={rating} count={reviewsCount} />
               </Flex>
               <Button
                  as="a"
                  href="#product"
                  colorScheme="brand"
                  size={{ base: 'sm', md: 'md' }}
                  flexShrink={0}
               >
                  Add to cart
               </Button>
            </HStack>
         </Wrapper>
      </Box>
   );
}

interface ProductRatingProps {
   rating?: number | null;
   count?: number | null;
}

function ProductRating({ rating, count }: ProductRatingProps) {
   if (rating == null || count == null) return null;

   if (!shouldShowProductRating({ rating, count })) {
      return null;
   }

   return (
      <HStack alignItems="unset">
         <Rating value={rating} size="3" />
         <Text color="gray.600">{rating}</Text>

         <Box
            w="1px"
            bg="gray.300"
            display={{
               base: 'none',
               sm: 'block',
            }}
         ></Box>

         <Link
            href="#reviews"
            color="gray.600"
            display={{
               base: 'none',
               sm: 'block',
            }}
         >
            {count} reviews
         </Link>
      </HStack>
   );
}
