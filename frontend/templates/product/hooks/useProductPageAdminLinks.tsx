import type { PageEditMenuLink } from '@components/admin';
import {
   faA,
   faImage,
   faN,
   faShop,
   faWarehouse,
} from '@fortawesome/pro-solid-svg-icons';
import {
   akeneoProductUrl,
   iFixitAdminProductImagesUrl,
   iFixitAdminProductInventoryUrl,
   netsuiteProductUrl,
   shopifyStoreAdminProductUrl,
} from '@helpers/path-helpers';
import type { Product, ProductVariant } from '@models/product';
import { useMemo } from 'react';

interface UseProductPageAdminLinksOptions {
   product: Product;
   selectedVariant: ProductVariant;
   storeCode: string;
}

export function useProductPageAdminLinks({
   product,
   selectedVariant,
   storeCode,
}: UseProductPageAdminLinksOptions): PageEditMenuLink[] {
   return useMemo(
      () => [
         {
            icon: faA,
            label: 'Akeneo',
            url: akeneoProductUrl({ product }),
         },
         {
            icon: faN,
            label: 'NetSuite',
            url: netsuiteProductUrl(selectedVariant.sku ?? ''),
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
      [product, selectedVariant, storeCode]
   );
}
