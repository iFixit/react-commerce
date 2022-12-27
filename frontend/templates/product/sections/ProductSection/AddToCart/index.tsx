import {
   Box,
   Button,
   Flex,
   Link,
   Popover,
   PopoverArrow,
   PopoverBody,
   PopoverContent,
   PopoverTrigger,
   StackProps,
   Text,
   VStack,
} from '@chakra-ui/react';
import {
   faCircleExclamation,
   faCircleInfo,
} from '@fortawesome/pro-solid-svg-icons';
import { useAddToCart, useCartLineItem } from '@ifixit/cart-sdk';
import { FaIcon } from '@ifixit/icons';
import { useCartDrawer, useUserPrice } from '@ifixit/ui';
import type { Product, ProductVariant } from '@models/product.server';
import * as React from 'react';
import { NotifyMeForm } from './NotifyMeForm';

type AddToCartProps = {
   product: Product;
   selectedVariant: ProductVariantWithSku;
};

type ProductVariantWithSku = ProductVariant & { sku: string };

export function isVariantWithSku(
   variant: ProductVariant
): variant is ProductVariantWithSku {
   return typeof variant.sku === 'string';
}

export function AddToCart({ product, selectedVariant }: AddToCartProps) {
   const inventory = useVariantInventory(selectedVariant);
   const addToCart = useAddToCart();
   const { onOpen } = useCartDrawer();
   const userPrice = useUserPrice({
      price: selectedVariant.price,
      compareAtPrice: selectedVariant.compareAtPrice,
      proPricesByTier: selectedVariant.proPricesByTier,
   });

   const handleAddToCart = React.useCallback(() => {
      addToCart.mutate({
         type: 'product',
         product: {
            name: product.title,
            internalDisplayName: selectedVariant.internalDisplayName?.value,
            itemcode: selectedVariant.sku,
            shopifyVariantId: selectedVariant.id,
            quantity: 1,
            imageSrc: selectedVariant.image?.url || product.images[0]?.url,
            price: userPrice.price,
            compareAtPrice: userPrice.compareAtPrice,
         },
      });
      onOpen();
   }, [
      selectedVariant.sku,
      selectedVariant.id,
      selectedVariant.image?.url,
      addToCart,
      product.title,
      selectedVariant.internalDisplayName?.value,
      product.images,
      userPrice.price,
      userPrice.compareAtPrice,
      onOpen,
   ]);

   const isSelectedVariantAvailable =
      inventory.maxToBeAdded != null && inventory.maxToBeAdded > 0;

   return (
      <Box mt="5">
         {isSelectedVariantAvailable && (
            <>
               <Button
                  w="full"
                  colorScheme="brand"
                  isLoading={addToCart.isLoading}
                  disabled={inventory.remaining === 0}
                  onClick={handleAddToCart}
                  data-testid="product-add-to-cart-button"
               >
                  Add to cart
               </Button>
               <InventoryMessage
                  quantityAvailable={inventory.maxToBeAdded}
                  quantityAddedToCart={inventory.addedToCart}
               />
               {selectedVariant.shippingRestrictions && (
                  <ShippingRestrictions
                     shippingRestrictions={selectedVariant.shippingRestrictions}
                     mt="2.5"
                  />
               )}
            </>
         )}
         {!isSelectedVariantAvailable && selectedVariant.sku != null && (
            <>
               {selectedVariant.shippingRestrictions && (
                  <ShippingRestrictions
                     shippingRestrictions={selectedVariant.shippingRestrictions}
                     mb="2.5"
                     align="flex-start"
                  />
               )}
               <NotifyMeForm sku={selectedVariant.sku} />
            </>
         )}
         {!isSelectedVariantAvailable && selectedVariant.sku == null && (
            <Box
               bgColor="gray.200"
               color="gray.400"
               w="full"
               py="2"
               textAlign="center"
               borderRadius="base"
               fontSize="md"
               borderWidth="1px"
               borderColor="gray.300"
            >
               Sold out
            </Box>
         )}
      </Box>
   );
}

type ShippingRestrictionsInfo = {
   [key: string]: { notice: string; text: string; link?: string };
};
const shippingRestrictionsInfo: ShippingRestrictionsInfo = {
   is_battery: {
      notice: 'Shipping restrictions apply',
      text: 'Batteries may only be shipped within the contiguous USA at this time and may only ship via standard shipping.',
      link: 'https://help.ifixit.com/article/195-battery-shipping-warnings',
   },
   is_dangerous: {
      notice: 'Shipping restrictions apply',
      text: 'New safety regulations for dangerous goods may cause shipping delays.',
      link: 'https://help.ifixit.com/article/264-what-are-the-shipping-restrictions-for-orders-containing-dangerous-goods',
   },
   us_only: {
      notice: 'US shipping only',
      text: 'Due to shipping regulations, iFixit may only ship this product within the United States of America.',
   },
   does_not_ship_to_mexico: {
      notice: 'Mexico shipping unavailable',
      text: 'Due to shipping regulations, iFixit may not ship this product to Mexico.',
   },
   fulfilled_via_dropshipping: {
      notice: 'Partner fulfilled',
      text: 'This product will be packed and shipped by one of our fulfillment partners.',
   },
};

type ShippingRestrictionsProps = StackProps & {
   shippingRestrictions: string[];
};

function ShippingRestrictions({
   shippingRestrictions,
   ...stackProps
}: ShippingRestrictionsProps) {
   const restrictionKeysToShow: string[] = [];
   const primaryRestrictionKey = shippingRestrictions.find(
      (sr) =>
         sr !== 'fulfilled_via_dropshipping' &&
         Object.keys(shippingRestrictionsInfo).includes(sr)
   );
   if (primaryRestrictionKey) {
      restrictionKeysToShow.push(primaryRestrictionKey);
   }
   if (shippingRestrictions.includes('fulfilled_via_dropshipping')) {
      restrictionKeysToShow.push('fulfilled_via_dropshipping');
   }

   if (restrictionKeysToShow.length > 0) {
      return (
         <VStack spacing="1" {...stackProps}>
            {restrictionKeysToShow.map((restrictionKey) => {
               const shippingRestriction =
                  shippingRestrictionsInfo[restrictionKey];
               return (
                  <Flex
                     key={restrictionKey}
                     py="0"
                     fontSize="sm"
                     align="center"
                  >
                     {shippingRestriction.notice}
                     <Popover trigger="hover">
                        <PopoverTrigger>
                           <FaIcon
                              display="block"
                              icon={faCircleInfo}
                              h="4"
                              m="-1.5"
                              ml="0"
                              p="1.5"
                              color="gray.400"
                           />
                        </PopoverTrigger>
                        <PopoverContent>
                           <PopoverArrow backgroundColor="gray.800" />
                           <PopoverBody
                              borderRadius="md"
                              backgroundColor="gray.800"
                              color="white"
                              fontSize="13px"
                           >
                              <Box>{shippingRestriction.text}</Box>
                              {shippingRestriction.link && (
                                 <Link
                                    href={shippingRestriction.link}
                                    color="brand.400"
                                    target="_blank"
                                 >
                                    Learn more
                                 </Link>
                              )}
                           </PopoverBody>
                        </PopoverContent>
                     </Popover>
                  </Flex>
               );
            })}
         </VStack>
      );
   }

   return null;
}

type InvetoryMessageProps = {
   quantityAvailable?: number | null;
   quantityAddedToCart?: number;
};

function InventoryMessage({
   quantityAvailable,
   quantityAddedToCart = 0,
}: InvetoryMessageProps) {
   if (quantityAvailable == null || quantityAvailable >= 10) {
      return null;
   }
   const remaining = Math.max(0, quantityAvailable - quantityAddedToCart);

   return (
      <Flex
         color="red.600"
         mt="2.5"
         fontSize="sm"
         align="center"
         justify="center"
         data-testid="product-inventory-message"
      >
         <FaIcon
            icon={faCircleExclamation}
            display="block"
            h="4"
            mr="1.5"
            color="red.500"
         />
         {remaining > 0 ? (
            <>
               Only{' '}
               <Text fontWeight="bold" mx="1">
                  {remaining}
               </Text>{' '}
               left
            </>
         ) : (
            <>No more items available</>
         )}
      </Flex>
   );
}

function useVariantInventory(variant: ProductVariantWithSku) {
   const cartLineItem = useCartLineItem(variant.sku);
   const cartMaxToAdd = cartLineItem.data?.maxToAdd ?? undefined;
   const addedToCart = cartLineItem.data?.quantity ?? undefined;
   const remaining =
      cartMaxToAdd != null && addedToCart != null
         ? Math.max(0, cartMaxToAdd - addedToCart)
         : undefined;
   const maxToBeAdded = cartMaxToAdd ?? variant.quantityAvailable ?? undefined;
   return {
      maxToBeAdded,
      addedToCart,
      remaining,
   };
}
