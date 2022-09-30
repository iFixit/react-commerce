import { computeDiscountPercentage } from '@helpers/commerce-helpers';
import { useAuthenticatedUser } from '@ifixit/auth-sdk';
import { ProductSearchHit } from '@models/product-list';

export type ProductSearchHitPricing = {
   price: number;
   compareAtPrice: number | undefined;
   isDiscounted: boolean;
   percentage: number;
};

export function useProductSearchHitPricing(
   product: ProductSearchHit
): ProductSearchHitPricing {
   const user = useAuthenticatedUser();

   let proTierPrice: number | null = null;
   const discountTier = user.data?.discountTier ?? null;
   if (discountTier) {
      const defaultVariantPrice =
         product.price_tiers?.[discountTier]?.default_variant_price;
      proTierPrice =
         defaultVariantPrice == null
            ? null
            : typeof defaultVariantPrice === 'string'
            ? parseFloat(defaultVariantPrice)
            : defaultVariantPrice;
   }

   const price = proTierPrice ?? product.price_float;
   const compareAtPrice = product.compare_at_price ?? product.price_float;
   const isDiscounted = compareAtPrice != null && compareAtPrice > price;

   const percentage = isDiscounted
      ? computeDiscountPercentage(price * 100, compareAtPrice! * 100)
      : 0;

   return {
      price,
      compareAtPrice,
      isDiscounted,
      percentage,
   };
}
