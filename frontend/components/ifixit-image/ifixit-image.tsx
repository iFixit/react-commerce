import Image, { ImageProps, ImageLoader } from 'next/image';

export function IfixitImage(props: ImageProps) {
   let unoptimized = props.unoptimized;

   if (typeof props.src === 'string') {
      if (isGuideImage(props.src)) {
         unoptimized = true;
      } else if (isCartImage(props.src)) {
         unoptimized = true;
      } else if (isStrapiImage(props.src)) {
         unoptimized = true;
      }
   }

   return <Image {...props} unoptimized={unoptimized} />;
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
