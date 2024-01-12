import { DEFAULT_STORE_CODE, IFIXIT_ORIGIN } from '@config/env';
import { getStoreList } from '@models/store';
import Product from '@pages/api/nextjs/cache/product';
import { devSandboxOrigin, shouldSkipCache } from 'app/_helpers/app-helpers';
import { RegionMenu } from '../../../components/region-menu';

interface RegionMenuSlotProps {
   params: {
      handle: string;
   };
   searchParams: {
      disableCacheGets?: string | string[] | undefined;
   };
}

export default async function RegionMenuSlot({
   params,
   searchParams,
}: RegionMenuSlotProps) {
   const [stores, product] = await Promise.all([getStoreList(), getProduct()]);

   if (stores.length === 0) return null;

   return <RegionMenu regions={product ? storesWithProductUrls() : stores} />;

   async function getProduct() {
      const result = await Product.get(
         {
            handle: params.handle,
            storeCode: DEFAULT_STORE_CODE,
            ifixitOrigin: devSandboxOrigin() ?? IFIXIT_ORIGIN,
         },
         { forceMiss: shouldSkipCache(searchParams) }
      );
      return result?.__typename === 'Product' ? result : null;
   }

   function storesWithProductUrls() {
      return stores.map((store) => {
         if (productEnabledFor(store.code)) {
            return {
               ...store,
               url: new URL(`/products/${product!.handle}`, store.url).href,
            };
         }

         return store;
      });
   }

   function productEnabledFor(storeCode: string) {
      const isCurrentStore = storeCode === DEFAULT_STORE_CODE;
      return (
         isCurrentStore ||
         product?.enabledDomains?.find((domain) => domain.code === storeCode) !=
            null
      );
   }
}
