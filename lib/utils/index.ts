import { ImageLoader } from 'next/image';

export function capitalize(text: string): string {
   return text.slice(0, 1).toUpperCase() + text.slice(1);
}

export function assertNever(x: never): never {
   throw new Error('Unexpected object: ' + x);
}

export const shopifyImageLoader: ImageLoader = ({ src, width, quality }) => {
   const match = src.match(/(.+)\.(jpg|png)\?(.+)/);
   if (match == null) {
      return '';
   }
   const [fullSrc, baseSrc, extension, query] = match;
   return `${baseSrc}_${width}x.${extension}?${query}`;
};

export const placeholderImageUrl =
   'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image.png?v=1530129081';
