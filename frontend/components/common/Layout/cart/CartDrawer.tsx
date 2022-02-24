import {
   Badge,
   Button,
   Drawer,
   DrawerBody,
   DrawerCloseButton,
   DrawerContent,
   DrawerFooter,
   DrawerHeader,
   DrawerOverlay,
   Flex,
   Heading,
   HStack,
   Icon,
   IconButton,
   SimpleGrid,
   Skeleton,
   Spinner,
   StackDivider,
   Text,
   useDisclosure,
   VStack,
} from '@chakra-ui/react';
import { IFIXIT_ORIGIN } from '@config/env';
import { useCart } from '@lib/cart';
import { useIsMounted } from '@lib/hooks';
import * as React from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { CartLineItem } from './CartLineItem';

export function CartDrawer() {
   const { isOpen, onOpen, onClose } = useDisclosure();
   const btnRef = React.useRef<HTMLButtonElement | null>(null);
   const isMounted = useIsMounted();
   const { data, isLoading, isRefetching } = useCart();

   React.useEffect(() => {
      console.log({ data, isLoading });
   }, [data, isLoading]);

   return (
      <>
         <IconButton
            ref={btnRef}
            aria-label="Open cart"
            variant="ghost"
            icon={<Icon as={FiShoppingCart} color="white" boxSize="6" />}
            onClick={onOpen}
            _hover={{
               bg: 'trueGray.800',
            }}
            _active={{
               bg: 'trueGray.800',
            }}
         />
         {isMounted && (
            <Drawer
               isOpen={isOpen}
               placement="right"
               onClose={onClose}
               finalFocusRef={btnRef}
               size="sm"
            >
               <DrawerOverlay />
               <DrawerContent color="gray.800">
                  <DrawerHeader borderBottomWidth="1px" position="relative">
                     <DrawerCloseButton
                        top="50%"
                        transform="translateY(-50%)"
                     />
                     <HStack align="center">
                        <Heading
                           size="xs"
                           lineHeight="normal"
                           letterSpacing="wider"
                           textTransform="uppercase"
                        >
                           Cart
                        </Heading>
                        <Badge
                           borderRadius="full"
                           variant="subtle"
                           colorScheme="gray"
                           boxSize="6"
                           display="flex"
                           alignItems="center"
                           justifyContent="center"
                           bg="gray.100"
                           color="gray.400"
                        >
                           {data?.totalNumItems ?? <Spinner size="xs" />}
                        </Badge>
                     </HStack>
                  </DrawerHeader>

                  <DrawerBody p="0">
                     <VStack
                        as="ul"
                        divider={<StackDivider borderColor="gray.200" />}
                        align="flex-start"
                        spacing="0"
                     >
                        {data?.products.map((product) => {
                           return (
                              <CartLineItem
                                 key={product.itemcode}
                                 lineItem={product}
                              />
                           );
                        })}
                     </VStack>
                  </DrawerBody>

                  <DrawerFooter borderTopWidth="1px">
                     <VStack w="full" spacing="3">
                        <Flex w="full" justify="space-between">
                           <Text fontSize="sm" fontWeight="bold">
                              Total
                           </Text>
                           <Flex direction="column" align="flex-end">
                              {data && !isRefetching ? (
                                 <>
                                    <Text
                                       color="brand.500"
                                       fontSize="xl"
                                       lineHeight="1em"
                                       fontWeight="bold"
                                    >
                                       {data.totals.total.amountStr}
                                    </Text>
                                    {data.totals.hasPriceDiscount && (
                                       <Text color="gray.500">
                                          You saved{' '}
                                          {data.totals.discount.amountStr}
                                       </Text>
                                    )}
                                 </>
                              ) : (
                                 <Skeleton h="20px" w="80px" />
                              )}
                           </Flex>
                        </Flex>
                        <SimpleGrid columns={2} spacing="2.5" w="full">
                           <Button
                              as="a"
                              href={`${IFIXIT_ORIGIN}/cart/view`}
                              variant="outline"
                              onClick={onClose}
                           >
                              View cart
                           </Button>
                           <Button colorScheme="blue">Checkout</Button>
                        </SimpleGrid>
                     </VStack>
                  </DrawerFooter>
               </DrawerContent>
            </Drawer>
         )}
      </>
   );
}
