import { ImageLoader, ImageLoaderProps } from 'next/legacy/image';

type SizeMap = {
   width: number;
   name: string;
}[];

// The following lists should be sorted in order of ascending width.
export const guideImageSizeMap: SizeMap = [
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

export const cartImageSizeMap: SizeMap = [
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

const guideImageRegExp = new RegExp(
   /^https:\/\/(guide-images\.cdn\.ifixit\.com|([^\/]+\.(ubreakit|cominor)\.com\/igi))\//
);
export function isGuideImage(src: string) {
   return guideImageRegExp.test(src);
}

const cartImageRegExp = new RegExp(
   /^https:\/\/(cart-products\.cdn\.ifixit\.com|([^\/]+\.(ubreakit|cominor)\.com\/cart-products))\//
);
export function isCartImage(src: string) {
   return cartImageRegExp.test(src);
}

const strapiImageRegExp = new RegExp(
   /^https:\/\/ifixit-(dev-)?strapi-uploads\.s3\.amazonaws\.com\/|^\/uploads\//
);
export function isStrapiImage(src: string) {
   return strapiImageRegExp.test(src);
}

export function getIFixitImageLoader(
   sizeMap: SizeMap,
   defaultSize: string,
   baseWidth?: number | string
): ImageLoader {
   return ({ src, width }: ImageLoaderProps) => {
      const baseSrc = src.replace(/\.[^/.]+$/, '');
      let realWidth = width;
      if (typeof baseWidth === 'string') {
         realWidth = parseInt(baseWidth);
      } else if (baseWidth) {
         realWidth = baseWidth;
      }
      // If next wants to see the 2x image here then this accounts for that in our calculations of resolution
      // see next's image.js getWidths() for more details
      const scaledWidth = width / realWidth > 2 ? realWidth * 2 : realWidth;

      const sizeName = getImageSize(scaledWidth, sizeMap, defaultSize);
      // We don't use the ?width param server-side, but it gets rid of a nextjs warning
      return baseSrc.concat('.', sizeName, `?width=${scaledWidth}`);
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
