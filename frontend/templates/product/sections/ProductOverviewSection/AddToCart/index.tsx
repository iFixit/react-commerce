import { Alert, Box, Button } from '@chakra-ui/react';
import { faExclamationCircle } from '@fortawesome/pro-solid-svg-icons';
import { useAddToCart, useCartLineItem } from '@ifixit/cart-sdk';
import { FaIcon } from '@ifixit/icons';
import { useCartDrawer, useIsScrolledPast, useUserPrice } from '@ifixit/ui';
import type { Product, ProductVariant } from '@pages/api/nextjs/cache/product';
import * as React from 'react';
import { AddToCartBar } from './AddToCartBar';
import { InventoryMessage } from './InventoryMessage';
import { NotifyMeForm } from './NotifyMeForm';
import { ShippingRestrictions } from './ShippingRestrictions';
import { trackGA4AddToCart } from '@ifixit/analytics';
import { getVariantIdFromVariantURI } from '@ifixit/helpers';

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

   const [isAddingToCart, addToCart] = useOptimisticAddToCart(
      product,
      selectedVariant
   );

   const isSelectedVariantAvailable =
      inventory.maxToBeAdded != null && inventory.maxToBeAdded > 0;

   const buttonRef = React.useRef<HTMLButtonElement>(null);
   const hasScrolledPastAddToCartButton = useIsScrolledPast(buttonRef);

   return (
      <Box mt="5">
         {isSelectedVariantAvailable && (
            <>
               <AddToCartBar
                  title={product.title}
                  variant={selectedVariant}
                  active={hasScrolledPastAddToCartButton}
                  onClickAddToCart={addToCart}
               />
               <Button
                  ref={buttonRef}
                  w="full"
                  colorScheme="brand"
                  isLoading={isAddingToCart}
                  isDisabled={inventory.remaining === 0}
                  onClick={addToCart}
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
               <Alert status="warning" mb="3" data-testid="out-of-stock-alert">
                  <FaIcon
                     icon={faExclamationCircle}
                     h="5"
                     mr="2"
                     color="amber.600"
                  />
                  <span>
                     This item is currently <strong>Out of Stock</strong>.
                  </span>
               </Alert>
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

function useVariantInventory(variant: ProductVariantWithSku) {
   const cartLineItem = useCartLineItem(variant.sku);
   const cartMaxToAdd = cartLineItem.data?.maxToAdd ?? undefined;
   const addedToCart = cartLineItem.data?.quantity ?? undefined;
   const remaining =
      variant.quantityAvailable != null && addedToCart != null
         ? Math.max(0, variant.quantityAvailable - addedToCart)
         : undefined;
   const maxToBeAdded = variant.quantityAvailable ?? cartMaxToAdd ?? undefined;
   return {
      maxToBeAdded,
      addedToCart,
      remaining,
   };
}

function useOptimisticAddToCart(
   product: Product,
   selectedVariant: ProductVariantWithSku
) {
   const addToCart = useAddToCart();
   const { onOpen } = useCartDrawer();
   const userPrice = useUserPrice({
      price: selectedVariant.price,
      compareAtPrice: selectedVariant.compareAtPrice,
      proPricesByTier: selectedVariant.proPricesByTier,
   });

   const optimisticAddToCart = React.useCallback(() => {
      addToCart.mutate({
         type: 'product',
         product: {
            name: product.title,
            variantTitle: selectedVariant.title,
            internalDisplayName:
               selectedVariant.internalDisplayName ?? undefined,
            itemcode: selectedVariant.sku,
            shopifyVariantId: selectedVariant.id,
            quantity: 1,
            imageSrc: selectedVariant.image?.url || product.images[0]?.url,
            price: userPrice.price,
            compareAtPrice: userPrice.compareAtPrice,
         },
      });
      onOpen(event, true);
      trackGA4AddToCart({
         currency: userPrice.price.currencyCode,
         value: Number(userPrice.price.amount),
         items: [
            {
               item_id: selectedVariant.sku,
               item_name: selectedVariant.internalDisplayName,
               item_variant: getVariantIdFromVariantURI(selectedVariant.id),
               price: Number(userPrice.price.amount),
               quantity: 1,
            },
         ],
      });
   }, [
      selectedVariant.sku,
      selectedVariant.title,
      selectedVariant.id,
      selectedVariant.image?.url,
      addToCart,
      product.title,
      selectedVariant.internalDisplayName,
      product.images,
      userPrice.price,
      userPrice.compareAtPrice,
      onOpen,
   ]);
   return [addToCart.isLoading, optimisticAddToCart] as const;
}
