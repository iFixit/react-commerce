import { invariant, timeAsync } from '@ifixit/helpers';
import { getServerShopifyStorefrontSdk } from '@lib/shopify-storefront-sdk';
import { Product, productFromQueryProduct } from '.';
import { findStoreByCode } from '../store';

export type FindProductArgs = {
   handle: string;
   storeCode: string;
};

export async function findProduct({
   handle,
   storeCode,
}: FindProductArgs): Promise<Product | null> {
   const store = await findStoreByCode(storeCode);
   const { storefrontDomain, storefrontDelegateAccessToken } = store.shopify;
   invariant(
      storefrontDelegateAccessToken,
      `Storefront delegate access token not found for store "${storeCode}"`
   );
   const storefront = getServerShopifyStorefrontSdk({
      shopDomain: storefrontDomain,
      storefrontDelegateToken: storefrontDelegateAccessToken,
   });

   const response = await timeAsync('shopify_api.findProduct', () =>
      storefront.findProduct({
         handle,
      })
   );
   const product = productFromQueryProduct(response.product);
   if (product == null) {
      return null;
   }

   return product;
}
