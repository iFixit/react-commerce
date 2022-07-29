import Image, { ImageProps, ImageLoader, ImageLoaderProps } from 'next/image';

interface SizeMapEntry {
   width: number;
   name: string;
}
type SizeMap = Array<SizeMapEntry>;

const guideImageSizeMap: SizeMap = [
   { name: 'mini', width: 56 },
   { name: 'thumbnail', width: 96 },
   { name: '140x105', width: 140 },
   { name: '200x150', width: 200 },
   { name: 'standard', width: 300 },
   { name: '440x330', width: 440 },
   { name: 'medium', width: 592 },
   { name: 'large', width: 800 },
   { name: 'huge', width: 1600 },
];

const cartImageSizeMap: SizeMap = [
   { name: 'mini', width: 41 },
   { name: 'thumbnail', width: 70 },
   { name: 'size110', width: 110 },
   { name: 'size170', width: 170 },
   { name: 'size250', width: 250 },
   { name: 'size400', width: 400 },
   { name: 'medium', width: 600 },
   { name: 'size1000', width: 1000 },
   { name: 'large', width: 3000 },
];

export function IfixitImage(props: ImageProps) {
   let loader = props.loader;

   if (typeof props.src === 'string') {
      if (isGuideImage(props.src)) {
         loader = getImageLoader(guideImageSizeMap, 'huge');
      } else if (isCartImage(props.src)) {
         loader = getImageLoader(cartImageSizeMap, 'large');
      }
   }

   return <Image {...props} loader={loader} />;
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

function getImageLoader(sizeMap: SizeMap, defaultSize: string): ImageLoader {
   return ({ src, width }: ImageLoaderProps) => {
      const baseSrc = src.replace(/\.[^/.]+$/, '');
      const sizeName = getImageSize(width, sizeMap, defaultSize);
      // We don't use the ?width param server-side, but it gets rid of a nextjs warning
      return baseSrc.concat('.', sizeName, `?width=${width}`);
   };
}

function getImageSize(
   width: number,
   sizeMap: SizeMap,
   defaultSize: string
): string {
   for (const size of sizeMap) {
      if (width < size.width) {
         return size.name;
      }
   }
   return defaultSize;
}
