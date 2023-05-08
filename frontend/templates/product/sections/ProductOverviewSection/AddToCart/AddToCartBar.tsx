import { Box, Button, Flex, HStack, Text } from '@chakra-ui/react';
import { ProductVariantPrice, Wrapper } from '@ifixit/ui';
import type { ProductVariant } from '@models/product';

interface AddToCartBarProps {
   title: string;
   variant: ProductVariant;
   active?: boolean;
   onClickAddToCart: () => void;
}

export function AddToCartBar({
   title,
   variant,
   onClickAddToCart,
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
                  <Text
                     fontSize={{
                        base: 'sm',
                        md: 'md',
                     }}
                     noOfLines={1}
                  >
                     {title} - {variant.title}
                  </Text>
                  <ProductVariantPrice
                     price={variant.price}
                     compareAtPrice={variant.compareAtPrice}
                     proPricesByTier={variant.proPricesByTier}
                     data-testid="add-to-cart-bar-price"
                     showDiscountLabel={false}
                     size={{ base: 'small' }}
                  />
               </Flex>
               <Button
                  colorScheme="brand"
                  size={{ base: 'sm', md: 'md' }}
                  flexShrink={0}
                  onClick={onClickAddToCart}
               >
                  Add to cart
               </Button>
            </HStack>
         </Wrapper>
      </Box>
   );
}
