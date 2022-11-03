import { Product } from '@models/product';
import { useQuery } from 'react-query';
import { useState } from 'react';
import { useIFixitApiClient } from '@ifixit/ifixit-api-client';
import { useSelectedVariant } from './useSelectedVariant';
import { getBuyBoxForProduct } from '@lib/ifixit-api/international-buy-box';
import { useExpiringLocalPreference } from '@ifixit/ui';

const buyBoxKey = (productcode: string) => ['buy-box-api', productcode];

export function useInternationalBuyBox(product: Product) {
   const apiClient = useIFixitApiClient();
   const [dismissed, setDismissed] = useExpiringLocalPreference<boolean | null>(
      'buy-box-this-store',
      null,
      7 // expire in days
   );
   const selectedVariant = useSelectedVariant();
   const buyBox = useQuery(
      buyBoxKey(String(product.productcode)),
      () => {
         if (!product.productcode) {
            return null;
         }
         return getBuyBoxForProduct(apiClient, product.productcode);
      },
      {
         staleTime: Infinity,
      }
   );

   const variant =
      buyBox.data?.products[String(selectedVariant.optionid)] || null;
   if (dismissed || !variant || !buyBox.data) {
      return null;
   }
   return {
      store: buyBox.data,
      selectedVariant: variant,
      dismissBuyBox: () => setDismissed(true),
   };
}
