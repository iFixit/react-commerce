import {
   Alert,
   AlertDescription,
   AlertTitle,
   Badge,
   Box,
   Button,
   Card,
   CloseButton,
   Divider,
   Flex,
   Heading,
   HStack,
   SimpleGrid,
   Spinner,
   VStack,
} from '@chakra-ui/react';
import { faCircleExclamation } from '@fortawesome/pro-solid-svg-icons';
import { useAppContext } from '@ifixit/app';
import { CartError, useCart, useCheckout } from '@ifixit/cart-sdk';
import { FaIcon } from '@ifixit/icons';
import * as React from 'react';
import { AnimatedList, Collapse, Slide, Fade } from '../../animations';
import { useIsMountedState } from '../../hooks';
import { CartEmptyState } from './CartEmptyState';
import { CartLineItem } from './CartLineItem';
import { CrossSell } from '../drawer/CrossSell';
import { ShoppingCartTotals } from './ShoppingCartTotals';

type CartQuery = ReturnType<typeof useCart>;

export function ShoppingCart() {
   const checkout = useCheckout();
   return (
      <Flex
         direction={{ base: 'column', lg: 'row' }}
         p={{ base: 3, md: 10, lg: 16 }}
         width="full"
         maxWidth="6xl"
         margin="auto"
      >
         <Box pr={{ base: '0', lg: '20' }} flexGrow="1">
            <ShoppingCartItems />
         </Box>
         <Flex direction="column" width={{ base: 'full', lg: 'sm' }} gap="5">
            <ShoppingCartTotals />
            <CheckoutError error={checkout.error} onDismiss={checkout.reset} />
            <CompleteOrderButton checkout={checkout} />
         </Flex>
      </Flex>
   );
}

export function ShoppingCartItems() {
   const appContext = useAppContext();
   const isMounted = useIsMountedState();
   const cart = useCart();
   const isCartEmpty = cart.isFetched && !cart.data?.hasItemsInCart;

   return (
      <VStack w="full" align="left" spacing="5">
         <CartHeading cart={cart} />
         <CartAlert cart={cart} />
         {cart.data?.hasItemsInCart && (
            <>
               <Card data-testid="cart-drawer-line-items">
                  {cart.data && (
                     <AnimatedList
                        items={cart.data.lineItems}
                        getItemId={(item) => item.itemcode}
                        renderItem={(item) => {
                           return (
                              <>
                                 <CartLineItem lineItem={item} />
                                 <Divider borderColor="chakra-border-color" />
                              </>
                           );
                        }}
                     />
                  )}
               </Card>
               <CrossSell />
            </>
         )}
         <Fade show={isCartEmpty} disableExitAnimation w="full">
            <CartEmptyState />
         </Fade>
      </VStack>
   );
}

function CompleteOrderButton({
   checkout,
}: {
   checkout: ReturnType<typeof useCheckout>;
}) {
   const cart = useCart();
   return (
      <Button
         w="full"
         colorScheme="blue"
         py="4"
         height="auto"
         disabled={!cart.data?.hasItemsInCart}
         isLoading={checkout.isRedirecting}
         onClick={checkout.redirectToCheckout}
      >
         Complete order
      </Button>
   );
}

function CartHeading({ cart }: { cart: CartQuery }) {
   return (
      <HStack align="center" w="full">
         <Heading size="xl">Shopping cart</Heading>
         {(cart.data != null || !cart.isError) &&
            cart.data?.totals.itemsCount !== 0 && (
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
   );
}

function CartAlert({ cart }: { cart: CartQuery }) {
   return cart.isError ? (
      <Alert
         status="error"
         variant="subtle"
         flexDirection="column"
         alignItems="center"
         justifyContent="center"
         textAlign="center"
         height="200px"
      >
         <FaIcon icon={faCircleExclamation} h="10" color="red.500" />
         <AlertTitle mt={4} mb={1} fontSize="lg">
            Unable to fetch the cart
         </AlertTitle>
         <AlertDescription maxWidth="sm">
            Please try to reload the page. If the problem persists, please
            contact us.
         </AlertDescription>
      </Alert>
   ) : null;
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
