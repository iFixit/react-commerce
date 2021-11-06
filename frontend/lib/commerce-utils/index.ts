export function computeDiscountPercentage(
   priceCents: number,
   compareAtPriceCents: number
): number {
   let percentage = 100 - (100 * priceCents) / compareAtPriceCents;
   percentage = Math.round(percentage);
   return percentage;
}
