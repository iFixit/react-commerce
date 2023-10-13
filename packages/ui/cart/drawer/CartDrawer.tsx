import {
   Alert,
   AlertDescription,
   AlertTitle,
   Badge,
   Box,
   Button,
   CloseButton,
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
   SimpleGrid,
   Skeleton,
   Spinner,
   Text,
} from '@chakra-ui/react';
import { faCircleExclamation } from '@fortawesome/pro-solid-svg-icons';
import { useAppContext } from '@ifixit/app';
import { CartError, useCart, useCheckout } from '@ifixit/cart-sdk';
import { formatMoney } from '@ifixit/helpers';
import { FaIcon } from '@ifixit/icons';
import * as React from 'react';
import { AnimatedList, Collapse, Slide, Fade } from '../../animations';
import { useIsMountedState } from '../../hooks';
import { CartDrawerTrigger } from './CartDrawerTrigger';
import { CartEmptyState } from './CartEmptyState';
import { CartLineItem } from './CartLineItem';
import { CrossSell } from './CrossSell';
import { useCartDrawer } from './hooks/useCartDrawer';

export function CartDrawer() {
   const appContext = useAppContext();
   const { isOpen, onOpen, onClose, onViewCart } = useCartDrawer();
   const isMounted = useIsMountedState();
   const cart = useCart();
   const checkout = useCheckout();
   const isCartEmpty = cart.isFetched && !cart.data?.hasItemsInCart;

   return (
      <>
         <CartDrawerTrigger
            onClick={onOpen}
            hasItemsInCart={cart.data?.hasItemsInCart}
         />
         {isMounted && (
            <Drawer
               isOpen={isOpen}
               placement="right"
               onClose={onClose}
               size="sm"
            >
               <DrawerOverlay />
               <DrawerContent color="gray.800" data-testid="cart-drawer">
                  <DrawerHeader borderBottomWidth="1px" position="relative">
                     <DrawerCloseButton
                        top="50%"
                        transform="translateY(-50%)"
                        data-testid="cart-drawer-close"
                     />
                     <HStack align="center">
                        <Heading size="sm" lineHeight="normal">
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
                              data-testid="cart-drawer-item-count"
                           >
                              {cart.isLoading ? (
                                 <Spinner size="xs" />
                              ) : (
                                 cart.data?.totals.itemsCount ?? 0
                              )}
                           </Badge>
                        )}
                     </HStack>
                  </DrawerHeader>

                  <DrawerBody
                     p="0"
                     data-testid="cart-drawer-body"
                     position="relative"
                  >
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
                     {cart.data?.hasItemsInCart && (
                        <>
                           <Box data-testid="cart-drawer-line-items">
                              {cart.data && (
                                 <AnimatedList
                                    items={cart.data.lineItems}
                                    getItemId={(item) => item.itemcode}
                                    renderItem={(item) => {
                                       return (
                                          <>
                                             <CartLineItem lineItem={item} />
                                             <Divider borderColor="borderColor" />
                                          </>
                                       );
                                    }}
                                 />
                              )}
                           </Box>
                           <CrossSell />
                        </>
                     )}
                     <Fade
                        show={isCartEmpty}
                        disableExitAnimation
                        position="absolute"
                        w="full"
                        top="0"
                        left="0"
                     >
                        <CartEmptyState onClose={onClose} />
                     </Fade>
                  </DrawerBody>

                  <Slide show={cart.data?.hasItemsInCart}>
                     <CheckoutError
                        error={checkout.error}
                        onDismiss={checkout.reset}
                     />
                     <DrawerFooter borderTopWidth="1px">
                        <Box w="full">
                           <Collapse show={!cart.isError} mb="3">
                              <Flex w="full" justify="space-between">
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
                                             {formatMoney(
                                                cart.data.totals.price
                                             )}
                                          </Text>
                                          {cart.data.totals.discount &&
                                             cart.data.totals.discount.amount >
                                                0 && (
                                                <Text color="gray.500">
                                                   You saved{' '}
                                                   {formatMoney(
                                                      cart.data.totals.discount
                                                   )}
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
                                 onClick={onViewCart}
                              >
                                 View cart
                              </Button>
                              <Button
                                 colorScheme="blue"
                                 isDisabled={!cart.data?.hasItemsInCart}
                                 isLoading={checkout.isRedirecting}
                                 onClick={checkout.redirectToCheckout}
                              >
                                 Checkout
                              </Button>
                           </SimpleGrid>
                        </Box>
                     </DrawerFooter>
                  </Slide>
               </DrawerContent>
            </Drawer>
         )}
      </>
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
      <Collapse show={checkoutError != null}>
         <Box p="3">
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
         </Box>
      </Collapse>
   );
}
