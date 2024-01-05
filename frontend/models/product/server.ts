import { invariant, timeAsync } from '@ifixit/helpers';
import { getServerShopifyStorefrontSdk } from '@lib/shopify-storefront-sdk';
import { strapi } from '@lib/strapi-sdk';
import { Product, getProduct } from '.';
import { findStoreByCode } from '../store';
import { fetchProductData } from '@lib/ifixit-api/productData';
import { IFixitAPIClient } from '@ifixit/ifixit-api-client';
import { z } from 'zod';

export type FindProductArgs = {
   handle: string;
   storeCode: string;
   ifixitOrigin: string;
};

type ShopifyProductRedirect = z.infer<typeof ShopifyProductRedirectSchema>;
export const ShopifyProductRedirectSchema = z.object({
   __typename: z.literal('ProductRedirect'),
   target: z.string(),
});

export async function findProduct({
   handle,
   storeCode,
   ifixitOrigin,
}: FindProductArgs): Promise<Product | ShopifyProductRedirect | null> {
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
   const [shopifyQueryResponse, strapiQueryResponse, iFixitQueryResponse] =
      await Promise.all([
         timeAsync('shopify_api.findProduct', () =>
            storefront.findProduct({
               handle,
               pathQuery: `path:/products/${handle}`,
            })
         ),
         timeAsync('strapi.findProduct', () =>
            strapi.findProduct({
               handle,
            })
         ),
         fetchProductData(
            new IFixitAPIClient({ origin: ifixitOrigin }),
            handle
         ),
      ]);

   if (iFixitQueryResponse?.redirectSkuUrl) {
      return {
         __typename: 'ProductRedirect',
         target: iFixitQueryResponse.redirectSkuUrl,
      };
   }

   const urlRedirect = shopifyQueryResponse.urlRedirects.edges[0]?.node?.target;
   const product = await getProduct({
      shopifyProduct: shopifyQueryResponse.product,
      strapiProduct: strapiQueryResponse.products?.data[0],
      iFixitProduct: iFixitQueryResponse,
   });
   if (product == null) {
      return urlRedirect
         ? { __typename: 'ProductRedirect', target: urlRedirect }
         : null;
   }

   return product;
}
