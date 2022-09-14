import { Box, Button, Flex, Text, useTheme, VStack } from '@chakra-ui/react';
import {
   faCircleExclamation,
   faCircleInfo,
} from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAddToCart } from '@ifixit/cart-sdk';
import { useCartDrawer } from '@ifixit/ui';
import { Product, ProductVariant } from '@models/product';
import * as React from 'react';
import { NotifyMeForm } from './NotifyMeForm';

const US_SALES_CHANNEL_ID = 1;

type AddToCartProps = {
   product: Product;
   selectedVariant: ProductVariant;
};

export function AddToCart({ product, selectedVariant }: AddToCartProps) {
   const addToCart = useAddToCart();
   const { onOpen } = useCartDrawer();

   const handleAddToCart = React.useCallback(() => {
      if (selectedVariant.sku) {
         addToCart.mutate({
            name: product.title,
            itemcode: selectedVariant.sku,
            formattedPrice: selectedVariant.formattedPrice,
            quantity: 1,
            imageSrc: selectedVariant.image?.url || product.images[0].url,
         });
         onOpen();
      }
   }, [
      addToCart,
      product.title,
      selectedVariant.sku,
      selectedVariant.formattedPrice,
      selectedVariant.image,
      product.images,
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
               {selectedVariant.quantityAvailable != null &&
                  selectedVariant.quantityAvailable < 10 && (
                     <InventoryMessage
                        quantityAvailable={selectedVariant.quantityAvailable}
                     />
                  )}
               <ShippingRestrictions />
            </>
         )}
         {!isSelectedVariantAvailable && selectedVariant.sku != null && (
            <NotifyMeForm
               sku={selectedVariant.sku}
               salesChannelID={US_SALES_CHANNEL_ID}
            />
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
   const theme = useTheme();
   return (
      <Flex py="0" fontSize="sm" align="center">
         Shipping restrictions apply
         <FontAwesomeIcon
            icon={faCircleInfo}
            color={theme.colors['gray'][400]}
            style={{
               display: 'block',
               height: '16px',
               marginLeft: '6px',
            }}
         />
      </Flex>
   );
}

type InvetoryMessageProps = {
   quantityAvailable?: number;
};

function InventoryMessage({ quantityAvailable }: InvetoryMessageProps) {
   const theme = useTheme();
   if (quantityAvailable == null || quantityAvailable >= 10) {
      return null;
   }
   return (
      <Flex color="red.600" py="0" fontSize="sm" align="center">
         <FontAwesomeIcon
            icon={faCircleExclamation}
            color={theme.colors['red'][500]}
            style={{
               display: 'block',
               height: '16px',
               marginRight: '6px',
            }}
         />
         Only{' '}
         <Text fontWeight="bold" mx="1">
            {quantityAvailable}
         </Text>{' '}
         left
      </Flex>
   );
}
