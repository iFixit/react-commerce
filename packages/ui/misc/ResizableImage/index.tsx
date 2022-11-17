import Image, { ImageProps } from 'next/image';
import {
   cartImageSizeMap,
   getIFixitImageLoader,
   guideImageSizeMap,
   isCartImage,
   isGuideImage,
   isStrapiImage,
} from './iFixitUtils';
import { getShopifyImageLoader, isShopifyImage } from './shopifyUtils';

export function ResizableImage(props: ImageProps) {
   const alt = props.alt ?? '';
   let loader = props.loader;
   let unoptimized = props.unoptimized;

   if (typeof props.src === 'string') {
      if (isGuideImage(props.src)) {
         loader = getIFixitImageLoader(guideImageSizeMap, 'huge', props.width);
      } else if (isCartImage(props.src)) {
         loader = getIFixitImageLoader(cartImageSizeMap, 'large', props.width);
      } else if (isStrapiImage(props.src)) {
         unoptimized = true;
      } else if (isShopifyImage(props.src)) {
         loader = getShopifyImageLoader();
      }
   }

   return (
      <Image alt={alt} unoptimized={unoptimized} loader={loader} {...props} />
   );
}

// Pixel GIF code adapted from https://stackoverflow.com/a/33919020/266535
const keyStr =
   'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

const triplet = (e1: number, e2: number, e3: number) =>
   keyStr.charAt(e1 >> 2) +
   keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
   keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
   keyStr.charAt(e3 & 63);

const rgbDataURL = (r: number, g: number, b: number) =>
   `data:image/gif;base64,R0lGODlhAQABAPAA${
      triplet(0, r, g) + triplet(b, 255, 255)
   }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;

export const defaultBlurDataUrl = rgbDataURL(240, 240, 240);
