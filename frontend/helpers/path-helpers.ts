import { APP_ORIGIN, IFIXIT_ORIGIN } from '@config/env';
import { invariant } from '@ifixit/helpers';
import type { Product } from '@models/product';
import {
   iFixitPageType,
   ProductList,
   ProductListType,
   StorePage,
} from '@models/product-list';
import { GetServerSidePropsContext } from 'next';
import { getProductIdFromGlobalId } from './product-helpers';
import { stylizeDeviceTitle } from './product-list-helpers';

export function productPath(handle: string) {
   switch (handle) {
      case 'pro-tech-toolkit':
         return `${IFIXIT_ORIGIN}/Store/Tools/Pro-Tech-Toolkit/IF145-307`;
      case 'manta-driver-kit-112-bit-driver-kit':
         return `${IFIXIT_ORIGIN}/Store/Tools/Manta-Driver-Kit--112-Bit-Driver-Kit/IF145-392`;
      default:
         return `/products/${handle}`;
   }
}

type ProductListPathAttributes = Pick<
   ProductList | StorePage,
   'type' | 'handle' | 'deviceTitle'
>;

export function productListPath(
   productList: ProductListPathAttributes
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
         return `/Parts/${deviceHandle}`;
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
      case iFixitPageType.Store: {
         return `${APP_ORIGIN}/Store`;
      }
      default: {
         throw new Error(`unknown product list type: ${productList.type}`);
      }
   }
}

interface AkineoProductUrlProps {
   product: Pick<Product, 'productcode'>;
}

export function akineoProductUrl({ product }: AkineoProductUrlProps) {
   return `${akineoUrl()}/redirect/edit/product/${encodeURIComponent(
      product.productcode ?? ''
   )}`;
}

export function akineoUrl() {
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
   const headers = context.req.headers;
   const host = (headers['x-ifixit-forwarded-host'] ||
      headers['x-forwarded-host']) as string | undefined;
   const isDevProxy = !!host?.match(
      /^(?!react-commerce).*(\.cominor\.com|\.ubreakit\.com)$/
   );
   const hostIfProxy = typeof window === 'undefined' ? `https://${host}` : '';
   return isDevProxy ? hostIfProxy! : IFIXIT_ORIGIN;
}

export function ifixitOriginWithSubdomain(subdomain: string) {
   return IFIXIT_ORIGIN.replace(/(^https:\/\/)www/, `$1${subdomain}`);
}
