import { toNumber } from '@helpers/zod-helpers';
import { ImageSchema } from '@models/shared/components/image';
import { MoneySchema } from '@models/shared/components/money';
import { ProPriceTiersSchema } from '@models/shared/components/pro-price-tiers';
import { z } from 'zod';

const BreadcrumbSchema = z.object({
   label: z.string(),
   url: z.string(),
});

export type Breadcrumb = z.infer<typeof BreadcrumbSchema>;

export type ProductImage = z.infer<typeof ImageSchema>;

const ProductVariantImageSchema = ImageSchema.extend({
   variantId: z.string().nullable(),
});

export type ProductVariantImage = z.infer<typeof ProductVariantImageSchema>;

const ProductOptionSchema = z.object({
   values: z.array(z.string()),
   id: z.string(),
   name: z.string(),
});

export const ProductVariantCardSchema = z.object({
   id: z.string(),
   sku: z.string().nullable().optional(),
   quantityAvailable: z.number().nullable().optional(),
   price: MoneySchema,
   compareAtPrice: MoneySchema.nullable().optional(),
   proPricesByTier: ProPriceTiersSchema.nullable(),
   image: ImageSchema.nullable().optional(),
   warranty: z.string().nullable(),
   enabled: z.boolean(),
   product: z.object({
      handle: z.string(),
      title: z.string(),
      tags: z.array(z.string()),
      rating: z.number().nullable(),
      reviewsCount: z.number().nullable(),
      oemPartnership: z.string().nullable(),
   }),
});

export type ProductVariantCard = z.infer<typeof ProductVariantCardSchema>;

const SelectedOptionSchema = z.object({
   name: z.string(),
   value: z.string(),
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
   crossSellVariants: z.array(ProductVariantCardSchema),
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

export type ProductVariant = z.infer<typeof ProductVariantSchema>;

const ReplacementGuideMetafieldItemSchema = z.object({
   id: z.string(),
   title: z.string(),
   guide_url: z.string(),
   image_url: z.string().optional().nullable(),
   summary: z.preprocess(
      (val) => (typeof val === 'string' ? val : null),
      z.string().optional().nullable()
   ),
   difficulty: z.string().optional().nullable(),
   time_required: z.string().optional().nullable(),
});

const CompatibilityMetafieldSchema = z
   .object({
      devices: z.array(
         z.object({
            imageUrl: z.string(),
            deviceUrl: z.string(),
            deviceName: z.string(),
            variants: z.array(z.string().nullable()),
         })
      ),
      hasMoreDevices: z.boolean(),
   })
   .optional()
   .nullable();

const RatingMetafieldSchema = z.object({
   scale_min: z.preprocess(toNumber, z.number()),
   scale_max: z.preprocess(toNumber, z.number()),
   value: z.preprocess(toNumber, z.number()),
});

const OemPartnershipMetafieldSchema = z
   .object({
      text: z.string(),
      code: z.string(),
      url: z.string().optional().nullable(),
   })
   .optional()
   .nullable();

const EnabledDomainsSchema = z
   .object({
      code: z.string(),
      domain: z.string().url(),
      locales: z.string().array(),
   })
   .array()
   .optional()
   .nullable();

export const ProductSchema = z.object({
   id: z.string(),
   handle: z.string(),
   title: z.string(),
   descriptionHtml: z.string(),
   iFixitProductId: z.string(),
   productcode: z.string().optional(),
   tags: z.array(z.string()),
   breadcrumbs: z.array(BreadcrumbSchema).nullable(),
   images: z.array(ProductVariantImageSchema),
   allImages: z.array(ProductVariantImageSchema),
   options: z.array(ProductOptionSchema),
   variants: z.array(ProductVariantSchema),
   allVariants: z.array(ProductVariantSchema),
   isEnabled: z.boolean(),
   prop65WarningType: z.string().nullable(),
   prop65Chemicals: z.string().nullable(),
   productVideos: z.string().nullable(),
   productVideosJson: z
      .object({
         id: z.string(),
         service: z.string(),
      })
      .nullable(),
   faqs: z.array(
      z.object({
         question: z.string(),
         answer: z.string(),
      })
   ),
   replacementGuides: z.array(ReplacementGuideMetafieldItemSchema),
   featuredProductVariants: z.array(ProductVariantCardSchema),
   compatibility: CompatibilityMetafieldSchema,
   metaTitle: z.string().nullable(),
   shortDescription: z.string().nullable(),
   rating: RatingMetafieldSchema.nullable(),
   reviewsCount: z.number().nullable(),
   oemPartnership: OemPartnershipMetafieldSchema,
   enabledDomains: EnabledDomainsSchema,
   redirectUrl: z.string().nullable(),
   vendor: z.string().nullable(),
});

export type Product = z.infer<typeof ProductSchema>;
