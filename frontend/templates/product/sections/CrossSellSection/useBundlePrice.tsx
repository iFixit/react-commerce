import { formatMoney } from '@ifixit/helpers';
import type { ProductPreview } from '@models/components/product-preview';
import type { ProductVariant } from '@models/product';
import React from 'react';

export interface UseBundlePriceProps {
   selectedVariant: ProductVariant;
   crossSellVariants: ProductPreview[];
   selectedVariantIds: string[];
}

export function useBundlePrice({
   selectedVariant,
   crossSellVariants,
   selectedVariantIds,
}: UseBundlePriceProps) {
   const bundlePrice = React.useMemo(() => {
      return selectedVariantIds.reduce((acc, id) => {
         if (id === selectedVariant.id) {
            return acc + selectedVariant.price.amount;
         }
         const variant = crossSellVariants.find((variant) => variant.id === id);
         if (variant) {
            return acc + variant.price.amount;
         }
         return acc;
      }, 0);
   }, [
      crossSellVariants,
      selectedVariant.id,
      selectedVariant.price.amount,
      selectedVariantIds,
   ]);

   const formattedBundlePrice = React.useMemo(() => {
      return formatMoney({
         amount: bundlePrice,
         currencyCode: selectedVariant.price.currencyCode,
      });
   }, [selectedVariant.price.currencyCode, bundlePrice]);

   return formattedBundlePrice;
}
