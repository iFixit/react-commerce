import Image, { ImageProps } from 'next/image';
import {
   cartImageSizeMap,
   getIFixitImageLoader,
   guideImageSizeMap,
   isCartImage,
   isGuideImage,
   isStrapiImage,
   buildSrcSet,
   SizeMap,
} from './iFixitUtils';
import { getShopifyImageLoader, isShopifyImage } from './shopifyUtils';

export function ResponsiveImage(props: ImageProps) {
   const alt = props.alt ?? '';
   let loader = props.loader;
   let unoptimized = props.unoptimized;

   if (typeof props.src === 'string') {
      if (isGuideImage(props.src)) {
         loader = getIFixitImageLoader(guideImageSizeMap, 'huge', props.width);
      } else if (isCartImage(props.src)) {
         if (typeof props.sizes === 'string') {
            return (
               <FixedSizesResponsiveImage
                  src={props.src}
                  sizes={props.sizes}
                  sizeMap={cartImageSizeMap}
               />
            );
         }
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

type FixedSizesResponsiveImageProps = {
   src: string;
   alt?: string;
   sizeMap: SizeMap;
   sizes: string | undefined;
};

function FixedSizesResponsiveImage(props: FixedSizesResponsiveImageProps) {
   const srcSet = buildSrcSet(props.sizeMap, props.src);
   return (
      <img
         src={props.src}
         alt={props.alt}
         srcSet={srcSet}
         sizes={props.sizes}
      />
   );
}
