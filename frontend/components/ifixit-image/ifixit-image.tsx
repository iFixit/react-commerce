import Image, { ImageProps, ImageLoader } from 'next/image';

export function IfixitImage(props: ImageProps) {
   if (typeof props.src === 'string') {
      if (isGuideImage(props.src)) {
         props.loader = passThroughLoader;
      } else if (isCartImage(props.src)) {
         props.loader = passThroughLoader;
      } else if (isStrapiImage(props.src)) {
         props.loader = passThroughLoader;
      }
   }

   return <Image {...props} />;
}

function isGuideImage(src: string) {
   return src.match(
      /^https:\/\/(guide-images\.cdn\.ifixit\.com\/|([^/]+\.(ubreakit|cominor)\.com\/igi))\//
   );
}

function isCartImage(src: string) {
   return src.match(
      /^https:\/\/(cart-products\.cdn\.ifixit\.com\/|([^/]+\.(ubreakit|cominor)\.com\/cart-products))\//
   );
}

function isStrapiImage(src: string) {
   return src.match(
      /^https:\/\/ifixit-(dev-)?strapi-uploads.s3.amazonaws.com\//
   );
}

function passThroughLoader({ src }: { src: string }) {
   return src;
}
