type Value = string | number;

type ReviewableProduct<T extends Value> = {
   rating: T;
   reviewsCount: T;
};

type NullablePartial<T> = { [P in keyof T]?: T[P] | null };

export function shouldShowProductRating<T extends Value>(
   product: NullablePartial<ReviewableProduct<T>>
): product is ReviewableProduct<T> {
   if (product.rating == null || product.reviewsCount == null) {
      return false;
   }
   const rating =
      typeof product.rating === 'string'
         ? parseFloat(product.rating)
         : product.rating;
   const ratingCount =
      typeof product.reviewsCount === 'string'
         ? parseFloat(product.reviewsCount)
         : product.reviewsCount;
   return rating >= 4 || ratingCount > 10;
}

const PRODUCT_CODE_LENGTH = 6;

/**
 * @param itemcode iFixit product (or product variant) itemcode (e.g. IF145-307-4)
 * @returns iFixit product sku (e.g. 145307), that is the itemcode digits without the option id
 */
export function getProductSku(itemcode: string): string {
   const skuDigits = getProductVariantSku(itemcode);
   return skuDigits.slice(0, PRODUCT_CODE_LENGTH);
}

/**
 * @param itemcode iFixit product variant itemcode (e.g. IF145-307-4)
 * @returns iFixit product variant option id (e.g. 4)
 */
export function getProductVariantOptionId(itemcode: string): string {
   const skuDigits = getProductVariantSku(itemcode);
   return skuDigits.slice(PRODUCT_CODE_LENGTH);
}

/**
 * @param itemcode iFixit product variant itemcode (e.g. IF145-307-4)
 * @returns iFixit product variant sku (e.g. 1453074)
 */
export function getProductVariantSku(itemcode: string): string {
   return itemcode.replace(/\D/g, '');
}

export function isLifetimeWarranty(warranty: string): boolean {
   return /lifetime/i.test(warranty);
}
