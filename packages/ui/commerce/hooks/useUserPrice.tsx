import React from 'react';
import { useAuthenticatedUser } from '@ifixit/auth-sdk';
import { Money } from '@ifixit/helpers';

type UseUserPriceProps = {
   price: Money;
   compareAtPrice?: Money | null;
   proPricesByTier?: Record<string, Money> | null;
};

type UseUserPriceResult = {
   price: Money;
   compareAtPrice?: Money | null;
};

export function useUserPrice(props: UseUserPriceProps): UseUserPriceResult {
   const getUserPrice = useGetUserPrice();
   return getUserPrice(props);
}

export function useGetUserPrice() {
   const { data: user } = useAuthenticatedUser();
   const discountTier = user?.discountTier;
   const isProUser = user?.is_pro ?? false;
   return React.useCallback(
      ({
         price,
         compareAtPrice,
         proPricesByTier,
      }: UseUserPriceProps): UseUserPriceResult => {
         let proPrice =
            discountTier != null && isProUser
               ? proPricesByTier?.[discountTier]
               : null;
         if (proPrice == null) {
            return {
               price,
               compareAtPrice,
            };
         }
         return {
            price: proPrice,
            compareAtPrice: compareAtPrice ?? price,
         };
      },
      [discountTier, isProUser]
   );
}
