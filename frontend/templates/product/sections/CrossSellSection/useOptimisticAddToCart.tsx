import { filterNullableItems } from '@helpers/application-helpers';
import { CartLineItem, useAddToCart } from '@ifixit/cart-sdk';
import { isPresent } from '@ifixit/helpers';
import { useCartDrawer, useGetUserPrice } from '@ifixit/ui';
import type { ProductPreview } from '@models/components/product-preview';
import type { Product, ProductVariant } from '@models/product';

export interface UseOptimisticAddToCartProps {
   product: Product;
   selectedVariant: ProductVariant;
   crossSellVariants: ProductPreview[];
   selectedVariantIds: string[];
}

export function useOptimisticAddToCart({
   product,
   selectedVariant,
   crossSellVariants,
   selectedVariantIds,
}: UseOptimisticAddToCartProps) {
   const addToCart = useAddToCart('Frequently Bought Together');
   const getUserPrice = useGetUserPrice();
   const { onOpen } = useCartDrawer();

   const optimisticAddToCart = () => {
      const input = selectedVariantIds.map((variantId): CartLineItem | null => {
         if (variantId === selectedVariant.id) {
            if (!isPresent(selectedVariant.sku)) {
               return null;
            }
            const userPrice = getUserPrice({
               price: selectedVariant.price,
               compareAtPrice: selectedVariant.compareAtPrice,
               proPricesByTier: selectedVariant.proPricesByTier,
            });
            return {
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
            };
         }
         const crossSellProductPreview = crossSellVariants.find(
            (v) => v.id === variantId
         );
         if (
            crossSellProductPreview == null ||
            !isPresent(crossSellProductPreview.sku)
         ) {
            return null;
         }
         const userPrice = getUserPrice({
            price: crossSellProductPreview.price,
            compareAtPrice: crossSellProductPreview.compareAtPrice,
            proPricesByTier: crossSellProductPreview.proPricesByTier,
         });
         return {
            name: crossSellProductPreview.title,
            variantTitle: selectedVariant.title,
            itemcode: crossSellProductPreview.sku,
            shopifyVariantId: selectedVariant.id,
            quantity: 1,
            imageSrc: crossSellProductPreview.image?.url ?? '',
            price: userPrice.price,
            compareAtPrice: userPrice.compareAtPrice,
         };
      });
      const selectedVariantSku = selectedVariant.sku;
      if (isPresent(selectedVariantSku)) {
         addToCart.mutate({
            type: 'bundle',
            bundle: {
               currentItemCode: selectedVariantSku,
               items: filterNullableItems(input),
            },
         });
         onOpen();
      } else {
         console.error('No SKU found for selected variant');
      }
   };

   return optimisticAddToCart;
}
