import { printZodError } from '@helpers/zod-helpers';
import { z } from 'zod';
import { AlgoliaProductHitSchema } from './algolia-product-hit';
import { imageFromUrl, ImageSchema } from './image';
import { moneyFromAmount, MoneySchema } from './money';
import {
   proPriceTiersFromAlgoliaPriceTiers,
   ProPriceTiersSchema,
} from './pro-price-tiers';
import {
   productReviewsFromAlgoliaProductHit,
   ProductReviewsSchema,
} from './product-reviews';

export type ProductPreview = z.infer<typeof ProductPreviewSchema>;

export const ProductPreviewSchema = z.object({
   id: z.string(),
   handle: z.string(),
   title: z.string(),
   image: ImageSchema.nullable(),
   price: MoneySchema,
   compareAtPrice: MoneySchema.nullable(),
   proPricesByTier: ProPriceTiersSchema.nullable(),
   isPro: z.boolean(),
   reviews: ProductReviewsSchema.nullable(),
   oemPartnership: z.string().nullable(),
   hasLifetimeWarranty: z.boolean(),
});

export function productPreviewFromAlgoliaHit(
   hit: unknown
): ProductPreview | null {
   const validation = AlgoliaProductHitSchema.safeParse(hit);
   if (!validation.success) {
      const hitId = (hit as any)?.objectID;
      console.error(
         `Invalid Algolia product hit with object id "${hitId}":`,
         printZodError(validation.error)
      );
      return null;
   }
   const product = validation.data;
   return {
      id: String(product.productid),
      handle: product.handle,
      title: product.title,
      image: imageFromUrl(product.image_url),
      price: moneyFromAmount(product.price_float, 'USD'),
      compareAtPrice: moneyFromAmount(product.compare_at_price, 'USD'),
      proPricesByTier: proPriceTiersFromAlgoliaPriceTiers(product.price_tiers),
      isPro: product.is_pro === 1,
      reviews: productReviewsFromAlgoliaProductHit(product),
      oemPartnership: product.oem_partnership ?? null,
      hasLifetimeWarranty: product.lifetime_warranty ?? false,
   };
}