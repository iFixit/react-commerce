import { IFIXIT_ORIGIN } from '@config/env';
import { invariant } from '@ifixit/helpers';
import {
   ProductList,
   ProductListType,
   iFixitPageType,
   iFixitPage,
} from '@models/product-list';
import { GetServerSidePropsContext } from 'next';
import { stylizeDeviceTitle } from './product-list-helpers';

type ProductListPathAttributes = Pick<
   ProductList | iFixitPage,
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
         return '/Store';
      }
      default: {
         throw new Error(`unknown product list type: ${productList.type}`);
      }
   }
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
