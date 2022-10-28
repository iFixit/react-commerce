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
   isProPrice: boolean;
};

enum DiscountTier {
   Employee = 'employee',
   Pro1 = 'pro_1',
   Pro2 = 'pro_2',
   Pro3 = 'pro_3',
   Pro4 = 'pro_4',
}

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
         if (proPrice == null || price.amount < proPrice.amount) {
            return {
               price,
               compareAtPrice,
               isProPrice: false,
            };
         }
         return {
            price: proPrice,
            compareAtPrice: compareAtPrice ?? price,
            isProPrice: discountTier !== DiscountTier.Employee,
         };
      },
      [discountTier, isProUser]
   );
}
