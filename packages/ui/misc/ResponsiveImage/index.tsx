import Image, { ImageLoader, ImageProps } from 'next/image';
import {
   cartImageSizeMap,
   getIFixitImageLoader,
   guideImageSizeMap,
   isCartImage,
   isGuideImage,
   isStrapiImage,
} from './iFixitUtils';
import { getShopifyImageLoader, isShopifyImage } from './shopifyUtils';

export function ResponsiveImage(props: ImageProps) {
   const alt = props.alt ?? '';

   let loader: ImageLoader | undefined;
   let unoptimized: boolean | undefined;

   if (typeof props.src === 'string') {
      if (isShopifyImage(props.src)) {
         loader = getShopifyImageLoader();
      } else if (isCartImage(props.src)) {
         loader = getIFixitImageLoader(cartImageSizeMap, 'large', props.width);
      } else if (isGuideImage(props.src)) {
         loader = getIFixitImageLoader(guideImageSizeMap, 'huge', props.width);
      } else if (isStrapiImage(props.src)) {
         unoptimized = false; // let next handle optimization cache resizing
      }
   }

   return (
      <Image alt={alt} loader={loader} unoptimized={unoptimized} {...props} />
   );
}
