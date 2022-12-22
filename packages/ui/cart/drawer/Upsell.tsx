import { Box, Button, Flex, HStack, Text } from '@chakra-ui/react';
import { useAddToCart } from '@ifixit/cart-sdk';
import { UpsellProduct } from '@ifixit/cart-sdk/types';
import { useCallback } from 'react';
import { ProductVariantPrice, useUserPrice } from '../../commerce';
import { CartLineItemImage } from './CartLineItemImage';

export interface UpsellProps {
   item: UpsellProduct;
}

export function Upsell({ item }: UpsellProps) {
   const addToCart = useAddToCart();
   const userPrice = useUserPrice({
      price: item.price,
      compareAtPrice: item.compareAtPrice,
      proPricesByTier: item.proPricesByTier,
   });
   const handleAddToCart = useCallback(() => {
      addToCart.mutate({
         type: 'product',
         product: {
            name: item.name,
            itemcode: item.itemcode,
            shopifyVariantId: item.shopifyVariantId,
            quantity: 1,
            imageSrc: item.imageSrc,
            price: userPrice.price,
            compareAtPrice: userPrice.compareAtPrice,
         },
      });
   }, [userPrice.price, userPrice.compareAtPrice, item]);

   return (
      <Box p="3">
         <Box
            bgColor="brand.100"
            py="4"
            px="3"
            rounded="md"
            borderWidth="1px"
            borderColor="brand.200"
            borderStyle="solid"
         >
            <Text color="brand.500" fontWeight="semibold">
               {item.marketingTitle ?? item.name}
            </Text>
            <Text color="brand.500">Add the product below to your order</Text>
            <HStack mt="3" align="center" spacing="3">
               <CartLineItemImage src={item.imageSrc} alt={item.name} />
               <Text fontSize="sm">{item.marketingBlurb}</Text>
            </HStack>
            <Flex mt="2" justify="flex-end">
               <ProductVariantPrice
                  price={item.price}
                  compareAtPrice={item.compareAtPrice}
                  proPricesByTier={item.proPricesByTier}
                  size="small"
               />
            </Flex>
            <Button
               isLoading={addToCart.isLoading}
               onClick={handleAddToCart}
               w="full"
               colorScheme="brand"
               mt="3"
               data-testid="upsell-add-to-cart-button"
            >
               Add to cart
            </Button>
         </Box>
      </Box>
   );
}
