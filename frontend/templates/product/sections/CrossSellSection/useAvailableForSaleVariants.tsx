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
   const getIsProductForSale = useGetIsProductAvailableForSale();

   return React.useMemo(() => {
      return crossSellVariants
         .filter((crossSellVariant) =>
            variant.crossSellVariantIds.includes(crossSellVariant.id)
         )
         .filter((crossSellVariant) => getIsProductForSale(crossSellVariant))
         .filter(hasCartDetails);
   }, [getIsProductForSale, variant.crossSellVariantIds, crossSellVariants]);
}

function useGetIsProductAvailableForSale() {
   const user = useAuthenticatedUser();
   const getIsProductAvailableForSale = React.useCallback(
      (product: ProductPreview) => {
         const isProUser = user.data?.is_pro ?? false;
         const isAvailableForSale =
            !product.isPro || (product.isPro && isProUser);
         return isAvailableForSale;
      },
      [user.data?.is_pro]
   );
   return getIsProductAvailableForSale;
}
