import {
   Box,
   Button,
   Flex,
   HStack,
   LinkBox,
   LinkOverlay,
   Text,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useAddToCart } from '@ifixit/cart-sdk';
import { UpsellProduct } from '@ifixit/cart-sdk/types';
import { useCallback } from 'react';
import { ProductVariantPrice, useUserPrice } from '../../commerce';
import { CartLineItemImage } from './CartLineItemImage';
import { useCartDrawer } from './hooks/useCartDrawer';

export interface UpsellProps {
   item: UpsellProduct;
}

export function Upsell({ item }: UpsellProps) {
   const { onClose } = useCartDrawer();
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
         <LinkBox
            role="group"
            bgColor="brand.100"
            py="4"
            px="3"
            rounded="md"
            borderWidth="1px"
            borderColor="brand.200"
            borderStyle="solid"
         >
            <NextLink href={`/products/${item.handle}`} passHref>
               <LinkOverlay
                  id={item.handle}
                  fontWeight="semibold"
                  color="brand.500"
                  _groupHover={{ color: 'black' }}
                  onClick={onClose}
               >
                  {item.marketingTitle ?? item.name}
                  <Text>Add the product below to your order</Text>
               </LinkOverlay>
            </NextLink>
            <HStack mt="3" align="center" spacing="3">
               <NextLink href={`/products/${item.handle}`} passHref>
                  <LinkOverlay onClick={onClose}>
                     <CartLineItemImage src={item.imageSrc} alt={item.name} />
                  </LinkOverlay>
               </NextLink>
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
         </LinkBox>
      </Box>
   );
}
