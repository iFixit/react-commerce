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
