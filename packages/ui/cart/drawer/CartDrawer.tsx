import {
   Alert,
   AlertDescription,
   AlertTitle,
   Badge,
   Box,
   BoxProps,
   Button,
   Circle,
   CloseButton,
   Collapse,
   Divider,
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
   IconButton,
   ScaleFade,
   SimpleGrid,
   Skeleton,
   Spinner,
   Text,
   VStack,
} from '@chakra-ui/react';
import { faCartCircleExclamation } from '@fortawesome/pro-duotone-svg-icons';
import {
   faCircleExclamation,
   faShoppingCart,
} from '@fortawesome/pro-solid-svg-icons';
import { useAppContext } from '@ifixit/app';
import { CartError, useCart, useCheckout } from '@ifixit/cart-sdk';
import { FaIcon } from '@ifixit/icons';
import { AnimatePresence, motion, usePresence } from 'framer-motion';
import * as React from 'react';
import { useIsMounted } from '../../hooks';
import { CartLineItem } from './CartLineItem';
import { useCartDrawer } from './hooks/useCartDrawer';

export function CartDrawer() {
   const appContext = useAppContext();
   const { isOpen, onOpen, onClose } = useCartDrawer();
   const isMounted = useIsMounted();
   const cart = useCart();
   const checkout = useCheckout();

   const totalDiscount = cart.data?.totals.discount;
   const savedAmount = totalDiscount ? parseFloat(totalDiscount.amount) : 0;

   return (
      <>
         <Box position="relative">
            <IconButton
               aria-label="Open cart"
               variant="ghost"
               transition="0.3s"
               _hover={{ opacity: 0.7 }}
               display="flex"
               w={8}
               h={8}
               icon={<FaIcon icon={faShoppingCart} h="22px" color="white" />}
               onClick={onOpen}
               _active={{
                  bg: 'gray.900',
               }}
            />
            {cart.data && cart.data.totalNumItems > 0 && (
               <Circle
                  position="absolute"
                  top="0.5"
                  right="2px"
                  size={3}
                  bg="blue.500"
                  borderRadius="full"
                  borderWidth={2}
                  borderColor="gray.900"
               />
            )}
         </Box>
         {isMounted && (
            <Drawer
               isOpen={isOpen}
               placement="right"
               onClose={onClose}
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
                        {(cart.data != null || !cart.isError) && (
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
                              {cart.isLoading ? (
                                 <Spinner size="xs" />
                              ) : (
                                 cart.data?.totalNumItems ?? 0
                              )}
                           </Badge>
                        )}
                     </HStack>
                  </DrawerHeader>

                  <DrawerBody p="0">
                     {cart.isError && (
                        <Alert
                           status="error"
                           variant="subtle"
                           flexDirection="column"
                           alignItems="center"
                           justifyContent="center"
                           textAlign="center"
                           height="200px"
                        >
                           <FaIcon
                              icon={faCircleExclamation}
                              h="10"
                              color="red.500"
                           />
                           <AlertTitle mt={4} mb={1} fontSize="lg">
                              Unable to fetch the cart
                           </AlertTitle>
                           <AlertDescription maxWidth="sm">
                              Please try to reload the page. If the problem
                              persists, please contact us.
                           </AlertDescription>
                        </Alert>
                     )}
                     <ScaleFade
                        in={cart.data != null && cart.data.totalNumItems > 0}
                     >
                        <Box as="ul">
                           <AnimatePresence>
                              {cart.data?.products.map((product) => {
                                 return (
                                    <ListItem key={product.itemcode}>
                                       <CartLineItem lineItem={product} />
                                       <Divider borderColor="gray.200" />
                                    </ListItem>
                                 );
                              })}
                           </AnimatePresence>
                        </Box>
                     </ScaleFade>
                     <Collapse
                        animateOpacity
                        in={cart.isFetched && !cart.data?.totalNumItems}
                     >
                        <VStack spacing="5" p="5">
                           <Circle size="72px" bg="brand.100">
                              <FaIcon
                                 icon={faCartCircleExclamation}
                                 h="8"
                                 color="blue.ifixit"
                              />
                           </Circle>
                           <Text>Your cart is empty</Text>
                           <Button colorScheme="blue" onClick={onClose}>
                              Back to shopping
                           </Button>
                        </VStack>
                     </Collapse>
                  </DrawerBody>

                  <Collapse
                     in={cart.data != null && cart.data.totalNumItems > 0}
                  >
                     <CheckoutError
                        error={checkout.error}
                        onDismiss={checkout.reset}
                     />
                     <DrawerFooter borderTopWidth="1px">
                        <Box w="full">
                           <Collapse in={!cart.isError}>
                              <Flex w="full" justify="space-between" mb="3">
                                 <Text fontSize="sm" fontWeight="bold">
                                    Total
                                 </Text>
                                 <Flex direction="column" align="flex-end">
                                    {cart.data && !cart.isRefetching ? (
                                       <>
                                          <Text
                                             color="brand.500"
                                             fontSize="xl"
                                             lineHeight="1em"
                                             fontWeight="bold"
                                          >
                                             {cart.data.totals.total.amountStr}
                                          </Text>
                                          {savedAmount > 0 && totalDiscount && (
                                             <Text color="gray.500">
                                                You saved{' '}
                                                {totalDiscount.amountStr}
                                             </Text>
                                          )}
                                       </>
                                    ) : (
                                       <Skeleton h="20px" w="80px" />
                                    )}
                                 </Flex>
                              </Flex>
                           </Collapse>
                           <SimpleGrid columns={2} spacing="2.5" w="full">
                              <Button
                                 as="a"
                                 href={`${appContext.ifixitOrigin}/cart/view`}
                                 variant="outline"
                                 onClick={onClose}
                              >
                                 View cart
                              </Button>
                              <Button
                                 colorScheme="blue"
                                 disabled={!cart.data?.hasItemsInCart}
                                 isLoading={checkout.isRedirecting}
                                 onClick={checkout.redirectToCheckout}
                              >
                                 Checkout
                              </Button>
                           </SimpleGrid>
                        </Box>
                     </DrawerFooter>
                  </Collapse>
               </DrawerContent>
            </Drawer>
         )}
      </>
   );
}

const MotionBox = motion<Omit<BoxProps, 'transition'>>(Box);

function ListItem({ children }: React.PropsWithChildren<{}>) {
   const [isPresent, safeToRemove] = usePresence();

   return (
      <MotionBox
         as="li"
         w="full"
         layout
         style={{ position: isPresent ? 'static' : 'absolute' }}
         initial="in"
         animate={isPresent ? 'in' : 'out'}
         variants={{
            in: {
               height: 'auto',
            },
            out: {
               height: 0,
               zIndex: -1,
               overflow: 'hidden',
            },
         }}
         onAnimationComplete={() => !isPresent && safeToRemove?.()}
         transition={{
            type: 'spring',
            stiffness: 500,
            damping: 50,
            mass: 1,
         }}
      >
         {children}
      </MotionBox>
   );
}

interface CheckoutErrorProps {
   error: CartError | null;
   onDismiss: () => void;
}

function CheckoutError({ error, onDismiss }: CheckoutErrorProps) {
   let checkoutError: React.ReactNode | null = null;

   switch (error) {
      case CartError.EmptyCart:
         checkoutError = 'Your cart is empty';
      case CartError.UnknownError:
         checkoutError = (
            <>
               Checkout unavailable. Please contact{' '}
               <a href="mailto:support@ifixit.com">support@ifixit.com</a>
            </>
         );
   }

   React.useEffect(() => {
      if (checkoutError) {
         const id = setTimeout(onDismiss, 5000);
         return () => clearTimeout(id);
      }
   }, [checkoutError, onDismiss]);

   return (
      <Collapse in={checkoutError != null}>
         <Alert status="error">
            <FaIcon
               icon={faCircleExclamation}
               h="4"
               mt="0.5"
               mr="2.5"
               color="red.500"
            />
            <Box flexGrow={1}>
               <AlertDescription>{checkoutError}</AlertDescription>
            </Box>
            <CloseButton
               alignSelf="flex-start"
               position="relative"
               right={-1}
               top={-1}
               onClick={onDismiss}
            />
         </Alert>
      </Collapse>
   );
}
