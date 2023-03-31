import { invariant, timeAsync } from '@ifixit/helpers';
import { getServerShopifyStorefrontSdk } from '@lib/shopify-storefront-sdk';
import { strapi } from '@lib/strapi-sdk';
import { Product, getProduct } from '.';
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

   const [shopifyQueryResponse, strapiQueryResponse] = await Promise.all([
      timeAsync('shopify_api.findProduct', () =>
         storefront.findProduct({
            handle,
         })
      ),
      strapi.findProduct({
         handle,
      }),
   ]);

   const product = await getProduct({
      shopifyProduct: shopifyQueryResponse.product,
      strapiProduct: strapiQueryResponse.products?.data[0],
   });
   if (product == null) {
      return null;
   }

   return product;
}
