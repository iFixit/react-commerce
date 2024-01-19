import type { Image } from '@models/components/image';
import type { Product } from '@models/product';

export function imagesFor(
   product: Product,
   selectedVariantId: string
): Image[] {
   const genericImages = product.images.filter((image) => {
      return image.variantId === null;
   });

   const selectedVariantImages = product.images.filter(
      (image) => image.variantId === selectedVariantId
   );

   const relevantImages = genericImages.concat(selectedVariantImages);

   return relevantImages.length > 0 ? relevantImages : product.fallbackImages;
}

export function defaultVariantIdFor(product: Product): string {
   const variant =
      product.variants.find(
         (variant) => variant.quantityAvailable && variant.quantityAvailable > 0
      ) ?? product.variants[0];
   return variant.id;
}
