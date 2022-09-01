import { Product } from '@models/product';
import React from 'react';

export function useSelectedVariant(product: Product) {
   const [selectedVariantId, setSelectedVariantId] = React.useState(() => {
      const variant =
         product.variants.find(
            (variant) =>
               variant.quantityAvailable && variant.quantityAvailable > 0
         ) ?? product.variants[0];
      return variant.id;
   });
   const selectedVariant = React.useMemo(() => {
      return product.variants.find(
         (variant) => variant.id === selectedVariantId
      )!;
   }, [product.variants, selectedVariantId]);
   return { selectedVariant, setSelectedVariantId };
}
