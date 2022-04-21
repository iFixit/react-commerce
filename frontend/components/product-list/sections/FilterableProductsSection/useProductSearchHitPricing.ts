import * as React from 'react';
import { useAuthenticatedUser } from '@ifixit/auth-sdk';
import { ProductSearchHit } from '@models/product-list';
import { computeDiscountPercentage } from '@helpers/commerce-helpers';

export type ProductSearchHitPricing = {
   price: number;
   compareAtPrice: number | undefined;
   isDiscounted: boolean;
   percentage: number;
};
export function useProductSearchHitPricing(
   product: ProductSearchHit
): ProductSearchHitPricing {
   const user = useAuthenticatedUser();

   const proTierPrice = React.useMemo(() => {
      const proTier = user.data?.discountTier ?? null;
      if (proTier) {
         const priceString = product.price_tiers?.[proTier];
         return priceString == null ? null : parseFloat(priceString);
      }
      return null;
   }, [user.data?.discountTier, product.price_tiers]);

   const isProUser = proTierPrice != null;

   const price = proTierPrice ?? product.price_float;
   const compareAtPrice = isProUser
      ? product.compare_at_price ?? product.price_float
      : product.compare_at_price;
   const isDiscounted = compareAtPrice != null && compareAtPrice > price;

   const percentage = isDiscounted
      ? computeDiscountPercentage(price * 100, compareAtPrice! * 100)
      : 0;

   return {
      price,
      compareAtPrice,
      isDiscounted,
      percentage,
   };
}
