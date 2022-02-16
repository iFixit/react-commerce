import * as React from 'react';
import {
   Badge,
   Button,
   Text,
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
   useDisclosure,
   VStack,
   Spinner,
   Skeleton,
   Box,
   IconButtonProps,
   StackDivider,
} from '@chakra-ui/react';
import { FiShoppingCart } from 'react-icons/fi';
import { useIsMounted } from '@lib/hooks';
import { IFIXIT_ORIGIN } from '@config/env';
import Image from 'next/image';
import {
   HiOutlineX,
   HiOutlineMinusCircle,
   HiOutlinePlusCircle,
} from 'react-icons/hi';
import { motion } from 'framer-motion';

export function CartDrawer() {
   const { isOpen, onOpen, onClose } = useDisclosure();
   const btnRef = React.useRef<HTMLButtonElement | null>(null);
   const isMounted = useIsMounted();
   const { data, isLoading } = useCart();

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
                              <Flex
                                 as="li"
                                 key={product.itemcode}
                                 direction="column"
                                 w="full"
                                 p="3"
                              >
                                 <Flex
                                    w="full"
                                    justify="space-between"
                                    align="flex-start"
                                 >
                                    <HStack spacing="3" align="flex-start">
                                       <Box
                                          boxSize="16"
                                          position="relative"
                                          borderColor="gray.200"
                                          borderWidth="2px"
                                          borderRadius="lg"
                                          overflow="hidden"
                                       >
                                          <Image
                                             src={product.imageSrc}
                                             alt=""
                                             priority
                                             layout="fill"
                                             objectFit="cover"
                                          />
                                       </Box>
                                       <Box>
                                          <VStack align="flex-start" pt="1">
                                             <Flex direction="column">
                                                <Text
                                                   fontWeight="bold"
                                                   fontSize="sm"
                                                >
                                                   {product.name}
                                                </Text>
                                                <Text
                                                   color="gray.500"
                                                   fontSize="xs"
                                                >
                                                   {product.itemcode}
                                                </Text>
                                             </Flex>
                                             <HStack>
                                                <MotionIconButton
                                                   aria-label="Decrease quantity by one"
                                                   variant="ghost"
                                                   color="gray.500"
                                                   icon={
                                                      <Icon
                                                         as={
                                                            HiOutlineMinusCircle
                                                         }
                                                         boxSize="5"
                                                      />
                                                   }
                                                   size="xs"
                                                   whileTap={{
                                                      scale: 0.9,
                                                   }}
                                                />
                                                <Text
                                                   color="gray.800"
                                                   fontSize="xs"
                                                >
                                                   {product.quantity}
                                                </Text>
                                                <MotionIconButton
                                                   aria-label="Increase quantity by one"
                                                   variant="ghost"
                                                   color="gray.500"
                                                   icon={
                                                      <Icon
                                                         as={
                                                            HiOutlinePlusCircle
                                                         }
                                                         boxSize="5"
                                                      />
                                                   }
                                                   size="xs"
                                                   whileTap={{
                                                      scale: 0.9,
                                                   }}
                                                />
                                             </HStack>
                                          </VStack>
                                       </Box>
                                    </HStack>
                                    <Box>
                                       <IconButton
                                          aria-label={`Remove ${product.name} from cart`}
                                          icon={
                                             <Icon
                                                as={HiOutlineX}
                                                boxSize="4"
                                             />
                                          }
                                          size="xs"
                                       />
                                    </Box>
                                 </Flex>
                                 <Box alignSelf="flex-end">
                                    <Text
                                       color="gray.800"
                                       fontSize="sm"
                                       fontWeight="medium"
                                    >
                                       {product.subPriceStr}
                                    </Text>
                                 </Box>
                              </Flex>
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
                              {data ? (
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

const MotionIconButton = motion<IconButtonProps>(IconButton);

interface CartData {
   couponName: string;
   hasCoupon: boolean;
   hasCustomer: boolean;
   totalNumItems: number;
   totals: {
      couponAmount: PriceItem;
      discount: PriceItem;
      hasFreeShippingOption: boolean;
      hasPriceDiscount: boolean;
      shipping: PriceItem;
      subtotal: PriceItem;
      tax: PriceItem;
      total: PriceItem;
   };
   products: Product[];
}

interface PriceItem {
   name: string;
   amount: string;
   amountStr: string;
}

interface Product {
   discount: string;
   imageSrc: string;
   itemcode: string;
   maxToAdd: number;
   name: string;
   quantity: number;
   subPrice: string;
   subPriceStr: string;
   subTotal: string;
   subTotalStr: string;
}

interface CartContext {
   data: CartData | null;
   isLoading: boolean;
}

function useCart(): CartContext {
   const [context, setContext] = React.useState<CartContext>({
      data: null,
      isLoading: true,
   });

   React.useEffect(() => {
      fetch(`${IFIXIT_ORIGIN}/api/2.0/store/user/cart`, {
         credentials: 'include',
      })
         .then((res) => res.json())
         .then((response) => {
            setContext({
               data: response?.cart ?? null,
               isLoading: false,
            });
         });
   }, []);

   return context;
}
