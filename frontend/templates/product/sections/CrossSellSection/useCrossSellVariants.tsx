import type { ProductPreview } from '@models/components/product-preview';
import type { ProductVariant } from '@pages/api/nextjs/cache/product';
import React from 'react';

export function useCrossSellVariants(
   selectedVariant: ProductVariant,
   crossSellVariants: ProductPreview[]
) {
   const [selectedVariantIds, setSelectedVariantIds] = React.useState(
      crossSellVariants.map((variant) => variant.id).concat(selectedVariant.id)
   );

   const toggle = (variantId: string) => {
      setSelectedVariantIds((current) => {
         if (current.includes(variantId)) {
            return current.filter((id) => id !== variantId);
         }
         return current.concat(variantId);
      });
   };

   React.useEffect(() => {
      setSelectedVariantIds(
         crossSellVariants
            .map((variant) => variant.id)
            .concat(selectedVariant.id)
      );
   }, [crossSellVariants, selectedVariant.id]);

   return {
      selectedVariantIds,
      toggle,
   };
}
