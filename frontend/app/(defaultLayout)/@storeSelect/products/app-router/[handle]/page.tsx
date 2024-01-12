import { DEFAULT_STORE_CODE, IFIXIT_ORIGIN } from '@config/env';
import { getStoreList } from '@models/store';
import Product from '@pages/api/nextjs/cache/product';
import { ProductPageProps } from 'app/(defaultLayout)/products/app-router/[handle]/page';
import { devSandboxOrigin, shouldSkipCache } from 'app/_helpers/app-helpers';
import { StoreSelect } from '../../../store-select';

export default async function ProductPageStoreSelect({
   params,
   searchParams,
}: ProductPageProps) {
   const [stores, product] = await Promise.all([getStoreList(), getProduct()]);

   return <StoreSelect stores={product ? storesWithProductUrls() : stores} />;

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
