import Image, { ImageLoader, ImageProps } from 'next/image';
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
   let loader: ImageLoader | undefined;
   let unoptimized: boolean | undefined;

   if (typeof props.src === 'string') {
      if (isShopifyImage(props.src)) {
         loader = getShopifyImageLoader();
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
      } else if (isGuideImage(props.src)) {
         loader = getIFixitImageLoader(guideImageSizeMap, 'huge', props.width);
      } else if (isStrapiImage(props.src)) {
         unoptimized = false; // let next handle optimization cache resizing
      }
   }

   return (
      <Image
         loader={loader}
         unoptimized={unoptimized}
         style={{ maxWidth: '100%' }}
         {...props}
      />
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
