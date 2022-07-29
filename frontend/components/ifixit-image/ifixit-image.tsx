import Image, { ImageProps, ImageLoader, ImageLoaderProps } from 'next/image';

export function IfixitImage(props: ImageProps) {
   const unoptimized = props.unoptimized;
   let loader;

   if (typeof props.src === 'string') {
      if (isGuideImage(props.src)) {
         loader = guideImageLoader;
      } else if (isCartImage(props.src)) {
         loader = cartImageLoader;
      } else if (isStrapiImage(props.src)) {
         // Use default loader unless unoptimized
      }
   }

   return <Image {...props} unoptimized={unoptimized} loader={loader} />;
}

function isGuideImage(src: string) {
   return src.match(
      /^https:\/\/(guide-images\.cdn\.ifixit\.com\/|([^/]+\.(ubreakit|cominor)\.com\/igi))\//
   );
}

function isCartImage(src: string) {
   return src.match(
      /^https:\/\/(cart-products\.cdn\.ifixit\.com\/|([^/]+\.(ubreakit|cominor)\.com\/cart-products))/
   );
}

function isStrapiImage(src: string) {
   return src.match(
      /^https:\/\/ifixit-(dev-)?strapi-uploads.s3.amazonaws.com\//
   );
}

const guideImageLoader: ImageLoader = ({
   src,
   width,
   quality,
}: ImageLoaderProps) => {
   const baseSrc = src.replace(/\.[^/.]+$/, '');
   const sizeName = getImageSize(width, guideImageSizeMap, 'huge');
   // We don't use the ?width param server-side, but it gets rid of a nextjs warning
   return baseSrc.concat('.', sizeName, `?width=${width}`);
};

const cartImageLoader: ImageLoader = ({
   src,
   width,
   quality,
}: ImageLoaderProps) => {
   const baseSrc = src.replace(/\.[^/.]+$/, '');
   const sizeName = getImageSize(width, cartImageSizeMap, 'large');
   return baseSrc.concat('.', sizeName, `?width=${width}`);
};

interface SizeMap {
   [index: string]: number;
}

const guideImageSizeMap: SizeMap = {
   mini: 56,
   thumbnail: 96,
   '140x105': 140,
   '200x150': 200,
   standard: 300,
   '440x330': 440,
   medium: 592,
   large: 800,
   huge: 1600,
};

const cartImageSizeMap: SizeMap = {
   mini: 41,
   thumbnail: 70,
   size110: 110,
   size170: 170,
   size250: 250,
   size400: 400,
   medium: 600,
   size1000: 1000,
   large: 3000,
};

const getImageSize = (width: number, sizeMap: SizeMap, defaultSize: string) => {
   for (const [sizeName, size] of Object.entries(sizeMap)) {
      if (width < size) {
         return sizeName;
      }
   }
   return defaultSize;
};
