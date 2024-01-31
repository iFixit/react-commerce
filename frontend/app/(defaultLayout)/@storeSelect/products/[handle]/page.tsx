import { DEFAULT_STORE_CODE } from '@config/env';
import { getStoreList } from '@models/store';
import { ProductPageProps } from 'app/(defaultLayout)/products/[handle]/page';
import { findProduct } from 'app/_data/product';
import { shouldSkipCache } from 'app/_helpers/app-helpers';
import { StoreSelect } from '../../store-select';
import { invariant } from '@ifixit/helpers';

export default async function ProductPageStoreSelect({
   params,
   searchParams,
}: ProductPageProps) {
   const [stores, product] = await Promise.all([
      getStoreList(),
      findProduct({
         handle: params.handle,
         noCache: shouldSkipCache(searchParams),
      }),
   ]);

   return <StoreSelect stores={product ? storesWithProductUrls() : stores} />;

   function storesWithProductUrls() {
      invariant(product);
      return stores.map((store) => {
         if (productEnabledFor(store.code)) {
            return {
               ...store,
               url: new URL(`/products/${product.handle}`, store.url).href,
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
