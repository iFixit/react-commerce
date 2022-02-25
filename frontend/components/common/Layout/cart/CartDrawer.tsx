import {
   Alert,
   AlertDescription,
   AlertIcon,
   AlertTitle,
   Badge,
   Box,
   BoxProps,
   Button,
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
   Icon,
   IconButton,
   ScaleFade,
   SimpleGrid,
   Skeleton,
   Spinner,
   Text,
   useDisclosure,
   VStack,
} from '@chakra-ui/react';
import { IFIXIT_ORIGIN } from '@config/env';
import { useCart } from '@lib/cart';
import { useIsMounted } from '@lib/hooks';
import { AnimatePresence, motion, usePresence } from 'framer-motion';
import * as React from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { CartLineItem } from './CartLineItem';

export function CartDrawer() {
   const { isOpen, onOpen, onClose } = useDisclosure();
   const btnRef = React.useRef<HTMLButtonElement | null>(null);
   const isMounted = useIsMounted();
   const cart = useCart();

   return (
      <>
         <Box position="relative">
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
            {cart.data && cart.data.totalNumItems > 0 && (
               <Box
                  position="absolute"
                  top="0.5"
                  right="0"
                  boxSize="2"
                  bg="blue.500"
                  borderRadius="full"
               />
            )}
         </Box>
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
                              {cart.data?.totalNumItems ?? (
                                 <Spinner size="xs" />
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
                           <AlertIcon boxSize="40px" mr={0} />
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
                     <ScaleFade
                        in={cart.data != null && cart.data.totalNumItems === 0}
                     >
                        <VStack spacing="5" p="5">
                           <Text fontSize="4xl" lineHeight="1em">
                              🥲
                           </Text>
                           <Text>Your cart is empty</Text>
                           <Button colorScheme="blue" onClick={onClose}>
                              Back to shopping
                           </Button>
                        </VStack>
                     </ScaleFade>
                  </DrawerBody>

                  <Collapse in={cart.data && cart.data.totalNumItems > 0}>
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
                                          {cart.data.totals
                                             .hasPriceDiscount && (
                                             <Text color="gray.500">
                                                You saved{' '}
                                                {
                                                   cart.data.totals.discount
                                                      .amountStr
                                                }
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
                                 href={`${IFIXIT_ORIGIN}/cart/view`}
                                 variant="outline"
                                 onClick={onClose}
                              >
                                 View cart
                              </Button>
                              <Button
                                 colorScheme="blue"
                                 disabled={cart.isError}
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
               // scale: 1, opacity: 1
            },
            out: {
               height: 0,
               // scale: 0,
               // opacity: 0,
               zIndex: -1,
               overflow: 'hidden',
            },
         }}
         onAnimationComplete={() => !isPresent && safeToRemove?.()}
         // transition
         // transition={{
         //    type: 'spring',
         //    stiffness: 500,
         //    damping: 60,
         //    mass: 1,
         // }}
         // overflow="hidden"
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
