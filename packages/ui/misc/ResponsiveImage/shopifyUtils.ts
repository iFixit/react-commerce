import { ImageLoaderProps } from 'next/image';

const CDN_HOSTNAMES = [
   'cdn.shopify.com',
   'cdn.shopifycdn.net',
   'shopify-assets.shopifycdn.com',
   'shopify-assets.shopifycdn.net',
];

const BASE_IMAGE_SIZE = 352;

export function isShopifyImage(src: string) {
   try {
      const url = new URL(src);
      return CDN_HOSTNAMES.some((allowedHostname) =>
         url.hostname.endsWith(allowedHostname)
      );
   } catch (e) {
      return false;
   }
}

export function getShopifyImageLoader() {
   return ({ src, width }: ImageLoaderProps) => {
      const newUrl = new URL(src);

      if (width) {
         let finalWidth: string;

         if (typeof width === 'string') {
            finalWidth = BASE_IMAGE_SIZE.toString();
         } else {
            finalWidth = width.toString();
         }

         newUrl.searchParams.append('width', finalWidth);
      }

      return newUrl.toString();
   };
}
