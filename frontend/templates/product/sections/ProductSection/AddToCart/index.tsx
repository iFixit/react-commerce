import { Box, Button, Flex, Text, VStack } from '@chakra-ui/react';
import {
   faCircleExclamation,
   faCircleInfo,
} from '@fortawesome/pro-solid-svg-icons';
import { useAddToCart } from '@ifixit/cart-sdk';
import { FaIcon } from '@ifixit/icons';
import { useCartDrawer, useUserPrice } from '@ifixit/ui';
import { Product, ProductVariant } from '@models/product';
import * as React from 'react';
import { NotifyMeForm } from './NotifyMeForm';

type AddToCartProps = {
   product: Product;
   selectedVariant: ProductVariant;
};

export function AddToCart({ product, selectedVariant }: AddToCartProps) {
   const addToCart = useAddToCart();
   const { onOpen } = useCartDrawer();
   const userPrice = useUserPrice({
      price: selectedVariant.price,
      compareAtPrice: selectedVariant.compareAtPrice,
      proPricesByTier: selectedVariant.proPricesByTier,
   });

   const handleAddToCart = React.useCallback(() => {
      if (selectedVariant.sku) {
         addToCart.mutate({
            type: 'product',
            product: {
               name: product.title,
               internalDisplayName: selectedVariant.internalDisplayName?.value,
               itemcode: selectedVariant.sku,
               shopifyVariantId: selectedVariant.id,
               quantity: 1,
               imageSrc: selectedVariant.image?.url || product.images[0].url,
               price: userPrice.price,
               compareAtPrice: userPrice.compareAtPrice,
            },
         });
         onOpen();
      }
   }, [
      selectedVariant.sku,
      selectedVariant.id,
      selectedVariant.image?.url,
      addToCart,
      product.title,
      selectedVariant.internalDisplayName?.value,
      product.images,
      userPrice.price,
      userPrice.compareAtPrice,
      onOpen,
   ]);

   const isSelectedVariantAvailable =
      selectedVariant.quantityAvailable != null &&
      selectedVariant.quantityAvailable > 0;

   return (
      <VStack mt="5" align="center">
         {isSelectedVariantAvailable && (
            <>
               <Button
                  w="full"
                  colorScheme="brand"
                  isLoading={addToCart.isLoading}
                  onClick={handleAddToCart}
               >
                  Add to cart
               </Button>
               <InventoryMessage
                  quantityAvailable={selectedVariant.quantityAvailable}
               />
               <ShippingRestrictions />
            </>
         )}
         {!isSelectedVariantAvailable && selectedVariant.sku != null && (
            <NotifyMeForm sku={selectedVariant.sku} />
         )}
         {!isSelectedVariantAvailable && selectedVariant.sku == null && (
            <Box
               bgColor="gray.200"
               color="gray.400"
               w="full"
               py="2"
               textAlign="center"
               borderRadius="base"
               fontSize="md"
               borderWidth="1px"
               borderColor="gray.300"
            >
               Sold out
            </Box>
         )}
      </VStack>
   );
}

function ShippingRestrictions() {
   return (
      <Flex py="0" fontSize="sm" align="center">
         Shipping restrictions apply
         <FaIcon
            display="block"
            icon={faCircleInfo}
            h="4"
            ml="1.5"
            color="gray.400"
         />
      </Flex>
   );
}

type InvetoryMessageProps = {
   quantityAvailable?: number | null;
};

function InventoryMessage({ quantityAvailable }: InvetoryMessageProps) {
   if (quantityAvailable == null || quantityAvailable >= 10) {
      return null;
   }
   return (
      <Flex color="red.600" py="0" fontSize="sm" align="center">
         <FaIcon
            icon={faCircleExclamation}
            display="block"
            h="4"
            mr="1.5"
            color="red.500"
         />
         Only{' '}
         <Text fontWeight="bold" mx="1">
            {quantityAvailable}
         </Text>{' '}
         left
      </Flex>
   );
}
