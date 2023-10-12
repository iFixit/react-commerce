import {
   Alert,
   Box,
   Collapse,
   Flex,
   HStack,
   IconButton,
   Link,
   Text,
   useToast,
   VStack,
} from '@chakra-ui/react';
import {
   faCircleExclamation,
   faCircleMinus,
   faCirclePlus,
   faTrash,
} from '@fortawesome/pro-solid-svg-icons';
import { useAppContext } from '@ifixit/app';
import {
   CartLineItem as LineItem,
   useRemoveLineItem,
   useUpdateLineItemQuantity,
} from '@ifixit/cart-sdk';
import { trackGA4AddToCart, trackGA4RemoveFromCart } from '@ifixit/analytics';
import { getVariantIdFromEncodedVariantURI } from '@ifixit/helpers';
import { multiplyMoney } from '@ifixit/helpers';
import { FaIcon } from '@ifixit/icons';
import * as React from 'react';
import { ProductVariantPrice } from '../../commerce';
import { CartLineItemImage } from './CartLineItemImage';

interface CartLineItemProps {
   lineItem: LineItem;
}

export function CartLineItem({ lineItem }: CartLineItemProps) {
   const appContext = useAppContext();
   const toast = useToast();
   const removeLineItem = useRemoveLineItem();
   const updateLineItemQuantity = useUpdateLineItemQuantity();

   React.useEffect(() => {
      if (updateLineItemQuantity.isError) {
         const id = setTimeout(() => {
            updateLineItemQuantity.reset();
         }, 3000);
         return () => clearTimeout(id);
      }
   }, [updateLineItemQuantity.isError, updateLineItemQuantity.reset]);

   React.useEffect(() => {
      if (removeLineItem.isError) {
         toast.closeAll();
         toast({
            status: 'error',
            title: 'Unable to remove product',
            description:
               'Please try again. If the problem persists contact us.',
            duration: 5000,
            isClosable: true,
            variant: 'subtle',
            position: 'bottom-right',
         });
      }
   }, [removeLineItem.isError]);

   const incrementQuantity = () => {
      updateLineItemQuantity.mutate({
         itemcode: lineItem.itemcode,
         quantity: 1,
      });
      trackGA4AddToCart({
         currency: lineItem.price.currencyCode,
         value: Number(lineItem.price.amount),
         items: [
            {
               item_id: lineItem.itemcode,
               item_name: lineItem.name + ' ' + lineItem.variantTitle,
               item_variant: getVariantIdFromEncodedVariantURI(
                  lineItem.shopifyVariantId
               ),
               price: Number(lineItem.price.amount),
               quantity: 1,
            },
         ],
      });
   };

   const decrementQuantity = () => {
      updateLineItemQuantity.mutate({
         itemcode: lineItem.itemcode,
         quantity: -1,
      });
      trackGA4RemoveFromCart({
         currency: lineItem.price.currencyCode,
         value: Number(lineItem.price.amount),
         items: [
            {
               item_id: lineItem.itemcode,
               item_name: lineItem.name + ' ' + lineItem.variantTitle,
               item_variant: getVariantIdFromEncodedVariantURI(
                  lineItem.shopifyVariantId
               ),
               price: Number(lineItem.price.amount),
               quantity: 1,
            },
         ],
      });
   };

   const handleRemoveLineItem = () => {
      removeLineItem.mutate({
         itemcode: lineItem.itemcode,
      });
      trackGA4RemoveFromCart({
         currency: lineItem.price.currencyCode,
         value: Number(lineItem.price.amount) * lineItem.quantity,
         items: [
            {
               item_id: lineItem.itemcode,
               item_name: lineItem.name + ' ' + lineItem.variantTitle,
               item_variant: getVariantIdFromEncodedVariantURI(
                  lineItem.shopifyVariantId
               ),
               price: Number(lineItem.price.amount),
               quantity: lineItem.quantity,
            },
         ],
      });
   };

   return (
      <Flex direction="column" w="full" p="3" bgColor="white">
         <Flex w="full" justify="space-between" align="flex-start">
            <HStack spacing="3" align="flex-start">
               <CartLineItemImage src={lineItem.imageSrc} alt={lineItem.name} />
               <Box>
                  <VStack align="flex-start">
                     <Flex direction="column">
                        <Link
                           href={`${appContext.ifixitOrigin}/Store/Product/${lineItem.itemcode}`}
                           isExternal
                           fontWeight="semibold"
                           fontSize="sm"
                           borderRadius="sm"
                        >
                           {lineItem.name}
                        </Link>
                        <Text color="gray.500" fontSize="sm">
                           {lineItem.itemcode}
                        </Text>
                        <Text color="gray.500" fontSize="sm">
                           {lineItem.variantTitle}
                        </Text>
                     </Flex>
                     <HStack
                        borderColor="gray.300"
                        borderWidth="1px"
                        borderRadius="md"
                     >
                        <IconButton
                           aria-label="Decrease quantity by one"
                           variant="ghost"
                           color="gray.500"
                           icon={
                              <FaIcon
                                 icon={faCircleMinus}
                                 h="4"
                                 color="gray.400"
                              />
                           }
                           size="xs"
                           isDisabled={lineItem.quantity <= 1}
                           onClick={decrementQuantity}
                           data-testid="cart-drawer-decrease-quantity"
                        />
                        <Text
                           color="gray.800"
                           fontSize="xs"
                           data-testid="cart-drawer-quantity"
                        >
                           {lineItem.quantity}
                        </Text>
                        <IconButton
                           aria-label="Increase quantity by one"
                           variant="ghost"
                           color="gray.500"
                           icon={
                              <FaIcon
                                 icon={faCirclePlus}
                                 h="4"
                                 color="gray.400"
                              />
                           }
                           size="xs"
                           isDisabled={
                              lineItem.maxToAdd != null &&
                              lineItem.quantity >= lineItem.maxToAdd
                           }
                           onClick={incrementQuantity}
                           data-testid="cart-drawer-increase-quantity"
                        />
                     </HStack>
                     <Collapse
                        in={updateLineItemQuantity.isError}
                        animateOpacity
                     >
                        <Alert
                           status="error"
                           bg="transparent"
                           textColor="red.500"
                           fontSize="sm"
                           p="0"
                        >
                           <FaIcon
                              icon={faCircleExclamation}
                              h="4"
                              mr="1.5"
                              color="red.500"
                           />
                           Unable to update quantity.
                        </Alert>
                     </Collapse>
                  </VStack>
               </Box>
            </HStack>
            <Box>
               <IconButton
                  bg="transparent"
                  _hover={{ bg: 'gray.100', color: 'gray.400' }}
                  aria-label={`Remove ${lineItem.name} from cart`}
                  _active={{ bg: 'gray.200' }}
                  color="gray.300"
                  icon={<FaIcon icon={faTrash} h="4" />}
                  size="xs"
                  onClick={handleRemoveLineItem}
                  data-testid="cart-drawer-remove-item"
               />
            </Box>
         </Flex>
         <Box alignSelf="flex-end">
            <ProductVariantPrice
               price={multiplyMoney(lineItem.price, lineItem.quantity)}
               compareAtPrice={
                  lineItem.compareAtPrice == null
                     ? null
                     : multiplyMoney(lineItem.compareAtPrice, lineItem.quantity)
               }
               direction="column-reverse"
               size="small"
            />
         </Box>
      </Flex>
   );
}
