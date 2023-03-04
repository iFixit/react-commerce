import { ImageLoaderProps } from 'next/image';

const BASE_IMAGE_SIZE = 352;

const shopifyImageRegExp = new RegExp(
   /cdn\.shopify\.com|cdn\.shopifycdn\.net|shopify-assets\.shopifycdn\.com|shopify-assets\.shopifycdn\.net/
);
export function isShopifyImage(src: string) {
   return shopifyImageRegExp.test(src);
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
