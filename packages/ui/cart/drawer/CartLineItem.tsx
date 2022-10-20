import {
   Alert,
   Box,
   Center,
   Collapse,
   Flex,
   HStack,
   IconButton,
   IconButtonProps,
   Link,
   Text,
   useToast,
   VStack,
} from '@chakra-ui/react';
import { faImage } from '@fortawesome/pro-duotone-svg-icons';
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
import { multiplyMoney } from '@ifixit/helpers';
import { FaIcon } from '@ifixit/icons';
import { motion } from 'framer-motion';
import * as React from 'react';
import { ProductVariantPrice } from '../../commerce';
import { IfixitImage } from '../../misc/IfixitImage';

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
   };

   const decrementQuantity = () => {
      updateLineItemQuantity.mutate({
         itemcode: lineItem.itemcode,
         quantity: -1,
      });
   };

   const handleRemoveLineItem = () =>
      removeLineItem.mutate({
         itemcode: lineItem.itemcode,
      });

   return (
      <Flex direction="column" w="full" p="3">
         <Flex w="full" justify="space-between" align="flex-start">
            <HStack spacing="3" align="flex-start">
               <LineItemImage lineItem={lineItem} />
               <Box>
                  <VStack align="flex-start" pt="1">
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
                     </Flex>
                     <HStack
                        borderColor="gray.300"
                        borderWidth="1px"
                        borderRadius="md"
                     >
                        <MotionIconButton
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
                           whileTap={{
                              scale: 0.9,
                           }}
                           disabled={lineItem.quantity <= 1}
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
                        <MotionIconButton
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
                           whileTap={{
                              scale: 0.9,
                           }}
                           disabled={
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

const MotionIconButton = motion<IconButtonProps>(IconButton);

type LineItemImageProps = {
   lineItem: LineItem;
};

function LineItemImage({ lineItem }: LineItemImageProps) {
   return (
      <Box
         boxSize="16"
         position="relative"
         borderColor="gray.300"
         borderWidth="1px"
         borderRadius="md"
         overflow="hidden"
      >
         {lineItem.imageSrc ? (
            <IfixitImage
               src={lineItem.imageSrc}
               alt={lineItem.name}
               priority
               layout="fill"
               objectFit="cover"
            />
         ) : (
            <Center bgColor="gray.100" h="full">
               <FaIcon
                  icon={faImage}
                  color="gray.500"
                  h="6"
                  transition="color 300ms"
               />
            </Center>
         )}
      </Box>
   );
}
