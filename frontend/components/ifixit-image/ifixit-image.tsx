import Image, { ImageProps, ImageLoader, ImageLoaderProps } from 'next/image';

export function IfixitImage(props: ImageProps) {
   let unoptimized = props.unoptimized;
   let loader;

   if (typeof props.src === 'string') {
      if (isGuideImage(props.src)) {
         loader = guideImageLoader;
      } else if (isCartImage(props.src)) {
         loader = cartImageLoader;
      } else if (isStrapiImage(props.src)) {
         unoptimized = true;
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
   const sizeName = getImageSize(width, cartImageSizeMap, 'size1000');
   return baseSrc.concat('.', sizeName, `?width=${width}`);
};

type SizeMapEntry = [number, string];
type SizeMap = Array<SizeMapEntry>;

const guideImageSizeMap: SizeMap = [
   [56, 'mini'],
   [96, 'thumbnail'],
   [140, '140x105'],
   [200, '200x150'],
   [300, 'standard'],
   [440, '440x330'],
   [592, 'medium'],
   [800, 'large'],
   [1600, 'huge'],
];

const cartImageSizeMap: SizeMap = [
   [41, 'mini'],
   [70, 'thumbnail'],
   [110, 'size110'],
   [170, 'size170'],
   [250, 'size250'],
   [400, 'size400'],
   [600, 'medium'],
   [1000, 'size1000'],
];

const getImageSize = (width: number, sizeMap: SizeMap, defaultSize: string) => {
   for (const [size, sizeName] of sizeMap) {
      if (width < size) {
         return sizeName;
      }
   }
   return defaultSize;
};
