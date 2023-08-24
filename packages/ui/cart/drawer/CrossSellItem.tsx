import {
   Box,
   BoxProps,
   Button,
   Flex,
   HStack,
   LinkBox,
   LinkOverlay,
   Text,
} from '@chakra-ui/react';
import { useAddToCart } from '@ifixit/cart-sdk';
import { CrossSellProduct } from '@ifixit/cart-sdk/types';
import NextLink from 'next/link';
import { useCallback } from 'react';
import { ProductVariantPrice, useUserPrice } from '../../commerce';
import { CartLineItemImage } from './CartLineItemImage';
import { useCartDrawer } from './hooks/useCartDrawer';

export type CrossSellItemProps = BoxProps & {
   item: CrossSellProduct;
};

export function CrossSellItem({ item, ...otherProps }: CrossSellItemProps) {
   const { onClose } = useCartDrawer();
   const addToCart = useAddToCart('Cart Drawer');
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
            variantTitle: 'New',
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
      <Box
         bgColor="brand.100"
         py="4"
         px="3"
         rounded="md"
         borderWidth="1px"
         borderColor="brand.200"
         borderStyle="solid"
         {...otherProps}
      >
         {item.marketingHeading && (
            <Text fontSize="sm" color="brand.500" fontWeight="semibold">
               {item.marketingHeading}
            </Text>
         )}
         <Text fontSize="sm" color="brand.500" fontWeight="normal">
            Add the product below to your order
         </Text>
         <LinkBox mt="3" role="group">
            <HStack align="flex-start" spacing="3">
               <CartLineItemImage src={item.imageSrc} alt={item.name} />
               <Flex direction="column" align="flex-start">
                  <LinkOverlay
                     as={NextLink}
                     href={`/products/${item.handle}`}
                     onClick={onClose}
                     fontSize="sm"
                     fontWeight="semibold"
                     _groupHover={{
                        textDecoration: 'underline',
                     }}
                  >
                     {item.marketingTitle ?? item.name}
                  </LinkOverlay>
                  <Text fontSize="sm" mt="1.5">
                     {item.marketingBlurb}
                  </Text>
               </Flex>
            </HStack>
            <Flex mt="2" justify="flex-end">
               <ProductVariantPrice
                  price={item.price}
                  compareAtPrice={item.compareAtPrice}
                  proPricesByTier={item.proPricesByTier}
                  size="small"
               />
            </Flex>
         </LinkBox>
         <Button
            isLoading={addToCart.isLoading}
            onClick={handleAddToCart}
            w="full"
            colorScheme="brand"
            mt="3"
            data-testid="x-sell-add-to-cart-button"
         >
            Add to cart
         </Button>
      </Box>
   );
}
