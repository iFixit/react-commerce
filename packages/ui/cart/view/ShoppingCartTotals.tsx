import {
   Card,
   CardBody,
   CardHeader,
   VStack,
   Flex,
   Box,
   Spinner,
   Spacer,
   Text,
} from '@chakra-ui/react';
import { useCart } from '@ifixit/cart-sdk';
import { formatMoney } from '@ifixit/helpers';
import * as React from 'react';

export function ShoppingCartTotals() {
   const { data, isLoading } = useCart();
   if (!isLoading && !data) {
      return null;
   }
   return (
      <Card>
         <CardHeader
            p="5"
            borderBottom="1px solid"
            borderBottomColor="gray.300"
            color="gray.800"
            fontWeight="700"
            textAlign="center"
         >
            Summary
         </CardHeader>
         <CardBody>
            {isLoading ? (
               <Spinner />
            ) : data ? (
               <>
                  <VStack spacing="4" fontSize="sm">
                     <VStack w="100%" lineHeight="normal" spacing="3" mb="2">
                        <Flex
                           justify="space-between"
                           w="100%"
                           alignItems="center"
                        >
                           <Box textAlign="left" color="gray.600">
                              Subtotal
                           </Box>
                           <Box
                              textAlign="right"
                              color="gray.800"
                              fontWeight="700"
                           >
                              {formatMoney(
                                 data.totals.compareAtPrice || data.totals.price
                              )}
                           </Box>
                        </Flex>
                        {data.totals.discount?.amount && (
                           <Flex
                              justify="space-between"
                              w="100%"
                              color="brand.500"
                              alignItems="center"
                           >
                              <Box textAlign="left">You saved</Box>
                              <Box textAlign="right" fontWeight="700">
                                 {formatMoney(data.totals.discount)}
                              </Box>
                           </Flex>
                        )}
                        <Flex
                           justify="space-between"
                           w="100%"
                           fontSize="sm"
                           alignItems="center"
                        >
                           <Box textAlign="left" color="gray.600">
                              Shipping
                           </Box>
                           <Box
                              textAlign="right"
                              color="gray.800"
                              fontWeight="700"
                           >
                              Calculated at next step
                           </Box>
                        </Flex>
                     </VStack>
                     <Spacer
                        borderBottom="1px solid"
                        borderBottomColor="gray.300"
                     />
                     <Flex
                        justify="space-between"
                        w="100%"
                        fontSize="sm"
                        fontWeight="700"
                        alignItems="center"
                     >
                        <Box textAlign="left" color="gray.600">
                           Total
                        </Box>
                        <Box textAlign="right" color="brand.500" fontSize="2xl">
                           {formatMoney(data.totals.price)}
                        </Box>
                     </Flex>
                  </VStack>
               </>
            ) : null}
         </CardBody>
      </Card>
   );
}
