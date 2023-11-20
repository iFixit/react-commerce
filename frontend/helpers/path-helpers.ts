import { IFIXIT_ORIGIN } from '@config/env';
import { getProductIdFromGlobalId, invariant } from '@ifixit/helpers';
import { SentryError } from '@ifixit/sentry';
import type { Product } from '@models/product';
import { ProductList, ProductListType } from '@models/product-list';
import type { IncomingHttpHeaders } from 'http';
import { GetServerSidePropsContext } from 'next';
import {
   stylizeDeviceItemType,
   stylizeDeviceTitle,
} from './product-list-helpers';

export function productPath(handle: string) {
   return `/products/${handle}`;
}

type ProductListPathAttributes = Pick<
   ProductList,
   'type' | 'handle' | 'deviceTitle'
>;

export function productListPath(
   productList: ProductListPathAttributes,
   itemType?: string
): string {
   switch (productList.type) {
      case ProductListType.AllParts: {
         return '/Parts';
      }
      case ProductListType.DeviceParts: {
         invariant(
            productList.deviceTitle != null,
            'device product list does not have device title'
         );
         const deviceHandle = encodeURIComponent(
            stylizeDeviceTitle(productList.deviceTitle)
         );
         const itemTypeHandle =
            itemType && encodeURIComponent(stylizeDeviceItemType(itemType));
         const basePath = `/Parts/${deviceHandle}`;
         return itemTypeHandle ? `${basePath}/${itemTypeHandle}` : basePath;
      }
      case ProductListType.AllTools: {
         return '/Tools';
      }
      case ProductListType.ToolsCategory: {
         return `/Tools/${productList.handle}`;
      }
      case ProductListType.Marketing: {
         return `/Shop/${productList.handle}`;
      }
      default: {
         throw new SentryError(
            `unknown product list type: ${productList.type}`
         );
      }
   }
}

export function storePath() {
   return '/Store';
}
interface AkeneoProductUrlProps {
   product: Pick<Product, 'productcode'>;
}

export function akeneoProductUrl({ product }: AkeneoProductUrlProps) {
   return `${akeneoUrl()}/redirect/edit/product/${encodeURIComponent(
      product.productcode ?? ''
   )}`;
}

export function akeneoUrl() {
   return ifixitOriginWithSubdomain('akeneo');
}

export interface IFixitAdminProductInvetoryUrlProps {
   product: Pick<Product, 'productcode'>;
}

export function iFixitAdminProductInventoryUrl({
   product,
}: IFixitAdminProductInvetoryUrlProps) {
   const encodedProductcode = encodeURIComponent(product.productcode ?? '');
   return `${iFixitAdminUrl()}/Inventory/inventory_report.php?searchTerm=${encodedProductcode}`;
}

interface IFixitAdminProductImagesUrlProps {
   product: Pick<Product, 'productcode'>;
}

export function iFixitAdminProductImagesUrl({
   product,
}: IFixitAdminProductImagesUrlProps) {
   const encodedProductcode = encodeURIComponent(product.productcode ?? '');
   return `${iFixitAdminUrl()}/Product/ProductImages.php?productcode=${encodedProductcode}`;
}

export function iFixitAdminUrl() {
   return `${IFIXIT_ORIGIN}/Admin`;
}

interface ShopifyAdminProductUrlProps {
   product: Pick<Product, 'id'>;
   storeCode: string;
}
export function shopifyStoreAdminProductUrl({
   product,
   storeCode,
}: ShopifyAdminProductUrlProps) {
   const adminProductId = getProductIdFromGlobalId(product.id);
   return `${shopifyStoreAdminUrl({ storeCode })}/products/${adminProductId}`;
}

interface ShopifyStoreAdminUrlProps {
   storeCode: string;
}

export function shopifyStoreAdminUrl({ storeCode }: ShopifyStoreAdminUrlProps) {
   return `${shopifyStoreOriginUrl({ storeCode })}/admin`;
}

interface ShopifyStoreOriginUrlProps {
   storeCode: string;
}

export function shopifyStoreOriginUrl({
   storeCode,
}: ShopifyStoreOriginUrlProps) {
   return `https://ifixit-${storeCode}.myshopify.com`;
}

export function ifixitOriginFromHost(
   context: GetServerSidePropsContext
): string {
   const incomingHttpHeaders = context.req.headers;
   return getiFixitOrigin(incomingHttpHeaders);
}

export function getiFixitOrigin(obj: Headers | IncomingHttpHeaders): string {
   const headers =
      obj instanceof Headers ? obj : new Headers(obj as HeadersInit);

   return getiFixitOriginFromHost(headers);
}

export function getiFixitOriginFromHost(headers: Headers) {
   const host =
      headers.get('x-ifixit-forwarded-host') || headers.get('x-forwarded-host');
   const isDevProxy = !!host?.match(
      /^(?!react-commerce).*(\.cominor\.com|\.ubreakit\.com)$/
   );
   const hostIfProxy = typeof window === 'undefined' ? `https://${host}` : '';
   return isDevProxy ? hostIfProxy! : IFIXIT_ORIGIN;
}

export function ifixitOriginWithSubdomain(subdomain: string) {
   return IFIXIT_ORIGIN.replace(/(^https:\/\/)www/, `$1${subdomain}`);
}

export function joinPaths(...paths: string[]) {
   return paths.map((path) => path.replace(/^\/|\/$/g, '')).join('/');
}
