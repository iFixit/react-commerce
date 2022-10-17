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
