import { filterFalsyItems } from '@helpers/application-helpers';
import { parseJSONMetafield } from '@helpers/storefront-helpers';
import { printZodError } from '@helpers/zod-helpers';
import { computeDiscountPercentage, parseItemcode } from '@ifixit/helpers';
import type {
   FindProductQuery,
   ImageFieldsFragment,
   ProductVariantFieldsFragment,
} from '@lib/shopify-storefront-sdk';
import { ImageSchema } from '@models/components/image';
import { getCurrencyCode, MoneySchema } from '@models/components/money';
import {
   proPriceTiersFromPriceTiersMetafield,
   ProPriceTiersSchema,
} from '@models/components/pro-price-tiers';
import {
   ProductPreview,
   productPreviewFromShopify,
} from '@models/components/product-preview';
import { z } from 'zod';

export type ProductVariant = z.infer<typeof ProductVariantSchema>;

const SelectedOptionSchema = z.object({
   name: z.string(),
   value: z.string(),
});

export type ProductVariantImage = z.infer<typeof ProductVariantImageSchema>;

export const ProductVariantImageSchema = ImageSchema.extend({
   variantId: z.string().nullable(),
});

export const ProductVariantSchema = z.object({
   id: z.string(),
   sku: z.string().optional().nullable(),
   productcode: z.string().optional(),
   optionid: z.string().optional(),
   image: ProductVariantImageSchema.nullable(),
   isDiscounted: z.boolean(),
   discountPercentage: z.number(),
   description: z.string().nullable(),
   kitContents: z.string().nullable(),
   assemblyContents: z.string().nullable(),
   note: z.string().nullable(),
   disclaimer: z.string().nullable(),
   warning: z.string().nullable(),
   specifications: z.string().nullable(),
   warranty: z.string().nullable(),
   crossSellVariantIds: z.array(z.string()),
   enabled: z.boolean(),
   disableWhenOOS: z.boolean(),
   shippingRestrictions: z.array(z.string()).nullable(),
   price: MoneySchema,
   compareAtPrice: MoneySchema.nullable().optional(),
   proPricesByTier: ProPriceTiersSchema.nullable(),
   quantityAvailable: z.number().nullable().optional(),
   internalDisplayName: z.string().nullable(),
   selectedOptions: z.array(SelectedOptionSchema),
   title: z.string(),
});

type QueryProduct = NonNullable<FindProductQuery['product']>;

export function productVariantFromShopifyFragment(
   product: QueryProduct,
   variant: ProductVariantFieldsFragment
): ProductVariant {
   const { crossSell, ...other } = variant;
   const isDiscounted =
      variant.compareAtPrice != null &&
      parseFloat(variant.compareAtPrice.amount) >
         parseFloat(variant.price.amount);
   const discountPercentage = isDiscounted
      ? computeDiscountPercentage(
           parseFloat(variant.price.amount) * 100,
           parseFloat(variant.compareAtPrice!.amount) * 100
        )
      : 0;
   const { productcode, optionid } = parseItemcode(String(variant.sku));
   const currencyCode = getCurrencyCode(variant.price.currencyCode);
   const crossSellVariants = getCrossSellProductVariant(variant);
   const variantImage = getProductVariantImage(product, variant.image);
   return {
      ...other,
      productcode,
      optionid,
      price: ProductVariantSchema.shape.price.parse(variant.price),
      compareAtPrice: ProductVariantSchema.shape.compareAtPrice.parse(
         variant.compareAtPrice
      ),
      image: variantImage?.variantId === variant.id ? variantImage : null,
      proPricesByTier: currencyCode
         ? proPriceTiersFromPriceTiersMetafield(
              variant.proPricesByTier?.value,
              currencyCode
           )
         : null,
      isDiscounted,
      discountPercentage,
      description: variant.description?.value ?? null,
      kitContents: variant.kitContents?.value ?? null,
      assemblyContents: variant.assemblyContents?.value ?? null,
      note: variant.note?.value ?? null,
      disclaimer: variant.disclaimer?.value ?? null,
      warning: variant.warning?.value ?? null,
      specifications: variant.specifications?.value ?? null,
      warranty: variant.warranty?.value ?? null,
      crossSellVariantIds: crossSellVariants.map((v) => v.id),
      enabled: variant.enabled?.value === 'true',
      disableWhenOOS: variant.disableWhenOOS?.value === 'true',
      shippingRestrictions: parseShippingRestrictions(
         variant.shippingRestrictions?.value
      ),
      internalDisplayName: variant.internalDisplayName?.value ?? null,
   };
}

export function getProductVariantImage(
   product: QueryProduct,
   image: ImageFieldsFragment | null | undefined
): ProductVariantImage | null {
   if (image == null) return null;

   const linkedVariant = product.variants.nodes.find(
      (variant) => variant.sku === image.altText
   );
   let altText = product.title;
   if (linkedVariant != null) {
      altText += ` ${linkedVariant.title.replace(/\s*\/\s*/g, ' ')}`;
   }
   return { ...image, altText, variantId: linkedVariant?.id ?? null };
}

function parseShippingRestrictions(value: string | null | undefined) {
   const json = parseJSONMetafield(value);
   if (json == null) {
      return null;
   }
   const result =
      ProductVariantSchema.shape.shippingRestrictions.safeParse(json);
   if (result.success) {
      return result.data;
   }
   printZodError(result.error, "Couldn't parse shipping restrictions");
   return null;
}

export function getAllCrossSellProductVariant(
   shopifyProduct: QueryProduct
): ProductPreview[] {
   const variantsById: Record<string, ProductPreview> = {};
   shopifyProduct.variants?.nodes.forEach((productVariant) => {
      const crossSellVariants = getCrossSellProductVariant(productVariant);
      crossSellVariants.forEach((variant) => {
         variantsById[variant.id] = variant;
      });
   });
   return Object.values(variantsById);
}

type QueryVariant = QueryProduct['variants']['nodes'][0];

export function getCrossSellProductVariant(
   variant: QueryVariant
): ProductPreview[] {
   const products =
      variant.crossSell?.references?.nodes.map(
         (node): ProductPreview | null => {
            if (node.__typename !== 'ProductVariant') {
               return null;
            }
            const variant = productPreviewFromShopify(node);

            if (variant == null) return null;

            const quantity = variant.quantityAvailable ?? 0;

            if (quantity > 0 && variant.enabled) {
               return variant;
            }
            return null;
         }
      ) ?? [];
   return filterFalsyItems(products);
}

export function isActiveVariant(variant: ProductVariant): boolean {
   const quantityAvailable = variant.quantityAvailable ?? 0;
   return variant.enabled && (!variant.disableWhenOOS || quantityAvailable > 0);
}

export function variantsFromQueryProduct(
   queryProduct: QueryProduct
): ProductVariant[] {
   const allVariants = queryProduct.variants.nodes.map((queryVariant) =>
      productVariantFromShopifyFragment(queryProduct, queryVariant)
   );
   const activeVariants = allVariants.filter(isActiveVariant);

   if (activeVariants.length > 0) return activeVariants;

   // If there are no active variants, return the first variant because
   // the product page needs to display something.
   return allVariants.slice(0, 1);
}
