import {
   Alert,
   Box,
   Collapse,
   Flex,
   HStack,
   IconButton,
   IconButtonProps,
   Link,
   Text,
   useTheme,
   useToast,
   VStack,
} from '@chakra-ui/react';
import { IfixitImage } from '@components/ifixit-image';
import {
   faCircleExclamation,
   faCircleMinus,
   faCirclePlus,
   faTrash,
} from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppContext } from '@ifixit/app';
import {
   APICartProduct,
   useRemoveLineItem,
   useUpdateLineItemQuantity,
} from '@ifixit/cart-sdk';
import { motion } from 'framer-motion';
import * as React from 'react';

interface CartLineItemProps {
   lineItem: APICartProduct;
}

export function CartLineItem({ lineItem }: CartLineItemProps) {
   const appContext = useAppContext();
   const toast = useToast();
   const removeLineItem = useRemoveLineItem();
   const updateLineItemQuantity = useUpdateLineItemQuantity();
   const theme = useTheme();

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
               <Box
                  boxSize="16"
                  position="relative"
                  borderColor="gray.300"
                  borderWidth="1px"
                  borderRadius="md"
                  overflow="hidden"
               >
                  <IfixitImage
                     src={lineItem.imageSrc}
                     alt=""
                     priority
                     layout="fill"
                     objectFit="cover"
                  />
               </Box>
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
                              <FontAwesomeIcon
                                 icon={faCircleMinus}
                                 color={theme.colors.gray[400]}
                                 style={{
                                    height: '16px',
                                 }}
                              />
                           }
                           size="xs"
                           whileTap={{
                              scale: 0.9,
                           }}
                           disabled={lineItem.quantity <= 1}
                           onClick={decrementQuantity}
                        />
                        <Text color="gray.800" fontSize="xs">
                           {lineItem.quantity}
                        </Text>
                        <MotionIconButton
                           aria-label="Increase quantity by one"
                           variant="ghost"
                           color="gray.500"
                           icon={
                              <FontAwesomeIcon
                                 icon={faCirclePlus}
                                 color={theme.colors.gray[400]}
                                 style={{
                                    height: '16px',
                                 }}
                              />
                           }
                           size="xs"
                           whileTap={{
                              scale: 0.9,
                           }}
                           disabled={lineItem.quantity >= lineItem.maxToAdd}
                           onClick={incrementQuantity}
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
                           <FontAwesomeIcon
                              icon={faCircleExclamation}
                              color={theme.colors.red[500]}
                              style={{
                                 height: '16px',
                                 marginRight: '6px',
                              }}
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
                  icon={
                     <FontAwesomeIcon
                        icon={faTrash}
                        style={{
                           height: '16px',
                        }}
                     />
                  }
                  size="xs"
                  onClick={handleRemoveLineItem}
               />
            </Box>
         </Flex>
         <Pricing lineItem={lineItem} />
      </Flex>
   );
}

const MotionIconButton = motion<IconButtonProps>(IconButton);

interface PricingProps {
   lineItem: APICartProduct;
}

function Pricing({ lineItem }: PricingProps) {
   const subtotal = parseFloat(lineItem.subTotal);
   const discount = lineItem.discount ? parseFloat(lineItem.discount) : 0;
   const comparedAt = subtotal + discount;
   const comparedAtStr = lineItem.subTotalStr.replace(
      lineItem.subTotal,
      comparedAt.toFixed(2)
   );

   return (
      <Box alignSelf="flex-end">
         {discount > 0 ? (
            <>
               <Text
                  color="gray.400"
                  fontSize="sm"
                  fontWeight="medium"
                  textDecorationLine="line-through"
               >
                  {comparedAtStr}
               </Text>
               <Text color="blue.500" fontSize="sm" fontWeight="bold">
                  {lineItem.subTotalStr}
               </Text>
            </>
         ) : (
            <Text color="gray.800" fontSize="sm" fontWeight="medium">
               {lineItem.subTotalStr}
            </Text>
         )}
      </Box>
   );
}
