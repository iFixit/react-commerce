import { ExternalImageProps, LoaderProps } from './ExternalImage';

interface SizeMapEntry {
   width: number;
   name: string;
}
type SizeMap = Array<SizeMapEntry>;

// These should be sorted in order of ascending width.
const guideImageSizeMap: SizeMap = [
   { name: 'mini', width: 41 },
   { name: 'thumbnail', width: 70 },
   { name: '140x105', width: 110 },
   { name: '200x150', width: 170 },
   { name: 'standard', width: 250 },
   { name: '440x330', width: 400 },
   { name: 'medium', width: 600 },
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

export const IMG_SRC_SET_SIZES = [70, 250, 600, 1000, 3000];

function isGuideImage(src: string) {
   return src.match(
      /^https:\/\/(guide-images\.cdn\.ifixit\.com|([^/]+\.(ubreakit|cominor)\.com\/igi))\//
   );
}

function isCartImage(src: string) {
   return src.match(
      /^https:\/\/(cart-products\.cdn\.ifixit\.com|([^/]+\.(ubreakit|cominor)\.com\/cart-products))\//
   );
}

export function iFixitImageLoader({ src, ...props }: ExternalImageProps<{}>) {
   let loader = props.loader;
   if (typeof src === 'string') {
      if (isGuideImage(src)) {
         loader = createLoader(guideImageSizeMap, 'huge');
      } else if (isCartImage(src)) {
         loader = createLoader(cartImageSizeMap, 'large');
      }
   }

   return loader;
}

function createLoader(sizeMap: SizeMap, defaultSize: string) {
   return ({ src, width }: LoaderProps<{}>) => {
      if (!src) {
         throw new Error(`<ResponsiveImage/>: 'src' is missing`);
      }

      const baseSrc = src?.replace(/\.[^/.]+$/, '');
      const sizeName = width
         ? getImageSize(
              typeof width === 'string' ? parseInt(width) : width,
              sizeMap,
              defaultSize
           )
         : defaultSize;
      return baseSrc.concat('.', sizeName);
   };
}

function getImageSize(
   width: number,
   sizeMap: SizeMap,
   defaultSize: string
): string {
   for (const size of sizeMap) {
      if (width <= size.width) {
         return size.name;
      }
   }
   return defaultSize;
}
