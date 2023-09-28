import {
   hasCartDetails,
   ProductPreviewWithCartDetails,
} from '@helpers/product-preview-helpers';
import { useAuthenticatedUser } from '@ifixit/auth-sdk';
import type { ProductPreview } from '@models/components/product-preview';
import type { ProductVariant } from '@pages/api/nextjs/cache/product';
import React from 'react';

export function useAvailableForSaleVariants(
   variant: ProductVariant,
   crossSellVariants: ProductPreview[]
): ProductPreviewWithCartDetails[] {
   const isForSale = useGetIsProductPreviewAvailableForSale();

   return React.useMemo(() => {
      return crossSellVariants
         .filter(belongsToVariant(variant))
         .filter(isForSale)
         .filter(hasCartDetails);
   }, [isForSale, variant, crossSellVariants]);
}

const belongsToVariant =
   (variant: ProductVariant) => (productPreview: ProductPreview) =>
      variant.crossSellVariantIds.includes(productPreview.id);

function useGetIsProductPreviewAvailableForSale() {
   const user = useAuthenticatedUser();
   const isProductAvailableForSale = React.useCallback(
      (product: ProductPreview) => {
         const isProUser = user.data?.is_pro ?? false;
         const isAvailableForSale =
            !product.isPro || (product.isPro && isProUser);
         return isAvailableForSale;
      },
      [user.data?.is_pro]
   );
   return isProductAvailableForSale;
}
