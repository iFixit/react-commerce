import { useIFixitApiClient } from '@ifixit/ifixit-api-client';
import { useExpiringLocalPreference } from '@ifixit/ui';
import { getBuyBoxForProduct } from '@lib/ifixit-api/international-buy-box';
import type { Product } from '@pages/api/nextjs/cache/product';
import { useQuery } from '@tanstack/react-query';
import { useSelectedVariant } from './useSelectedVariant';

const buyBoxKey = (productcode: string) => ['buy-box-api', productcode];

export function useInternationalBuyBox(product: Product) {
   const apiClient = useIFixitApiClient();
   const [dismissed, setDismissed] = useExpiringLocalPreference<boolean | null>(
      'buy-box-this-store',
      null,
      7, // expire in days
      (data: any) => (data === true || data === false ? data : null)
   );
   const [selectedVariant] = useSelectedVariant(product);
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
