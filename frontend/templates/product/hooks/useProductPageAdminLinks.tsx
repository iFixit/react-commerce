import type { PageEditMenuLink } from '@components/admin';
import {
   faArrowUpRightFromSquare,
   faImage,
   faShop,
   faWarehouse,
} from '@fortawesome/pro-solid-svg-icons';
import {
   akeneoProductUrl,
   iFixitAdminProductImagesUrl,
   iFixitAdminProductInventoryUrl,
   shopifyStoreAdminProductUrl,
} from '@helpers/path-helpers';
import type { Product } from '@models/product';
import { useMemo } from 'react';

interface UseProductPageAdminLinksOptions {
   product: Product;
   storeCode: string;
}

export function useProductPageAdminLinks({
   product,
   storeCode,
}: UseProductPageAdminLinksOptions): PageEditMenuLink[] {
   return useMemo(
      () => [
         {
            icon: faArrowUpRightFromSquare,
            label: 'Akeneo',
            url: akeneoProductUrl({ product }),
         },
         {
            icon: faShop,
            label: 'Shopify',
            url: shopifyStoreAdminProductUrl({ product, storeCode }),
         },
         {
            icon: faWarehouse,
            label: 'View Inventory',
            url: iFixitAdminProductInventoryUrl({ product }),
         },
         {
            icon: faImage,
            label: 'Edit Images',
            url: iFixitAdminProductImagesUrl({ product }),
         },
      ],
      [product, storeCode]
   );
}
