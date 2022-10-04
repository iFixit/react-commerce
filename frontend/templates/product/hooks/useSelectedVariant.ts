import { usePrevious } from '@ifixit/ui';
import { Product } from '@models/product';
import React from 'react';

export function useSelectedVariant(product: Product) {
   const defaultVariantId = getDefaultVariantId(product);
   const previousDefaultVariantId = usePrevious(defaultVariantId);
   const [selectedVariantId, setSelectedVariantId] = React.useState<
      string | null
   >();

   const hasDefaultVariantChanged =
      previousDefaultVariantId !== defaultVariantId;
   const currentId =
      hasDefaultVariantChanged || selectedVariantId == null
         ? defaultVariantId
         : selectedVariantId;

   React.useEffect(() => {
      if (hasDefaultVariantChanged) {
         setSelectedVariantId(null);
      }
   }, [hasDefaultVariantChanged]);

   const selectedVariant = React.useMemo(() => {
      return product.variants.find((variant) => variant.id === currentId)!;
   }, [product.variants, currentId]);

   return { selectedVariant, setSelectedVariantId };
}

function getDefaultVariantId(product: Product) {
   const variant =
      product.variants.find(
         (variant) => variant.quantityAvailable && variant.quantityAvailable > 0
      ) ?? product.variants[0];
   return variant.id;
}
