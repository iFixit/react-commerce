import { ImageSchema } from '@models/components/image';
import { z } from 'zod';
import { ProductListAncestorSchema } from './component/product-list-ancestor';
import { ProductListChildSchema } from './component/product-list-child';
import { ProductListType } from './component/product-list-type';
import { ProductListSectionSchema } from './sections';

const PriceTierSchema = z.object({
   default_variant_price: z.union([z.string(), z.number()]),
   min: z.union([z.string(), z.number()]),
   max: z.union([z.string(), z.number()]),
});
export type PriceTier = z.infer<typeof PriceTierSchema>;

const ProductSearchHitSchema = z
   .object({
      objectID: z.string(),
      title: z.string(),
      handle: z.string(),
      price_float: z.number(),
      compare_at_price: z.number().optional(),
      price_tiers: z.record(PriceTierSchema).optional(),
      sku: z.string(),
      image_url: z.string(),
      short_description: z.string().optional(),
      quantity_available: z.number(),
      lifetime_warranty: z.boolean(),
      oem_partnership: z.string().nullable(),
      rating: z.number(),
      rating_count: z.number(),
      url: z.string(),
      is_pro: z.number(),
   })
   .passthrough();
export type ProductSearchHit = z.infer<typeof ProductSearchHitSchema> & {
   [attribute: string]: unknown;
};

const WikiInfoEntrySchema = z.object({
   name: z.string(),
   value: z.string(),
   inheritedFrom: z.string().nullable(),
});
export type WikiInfoEntry = z.infer<typeof WikiInfoEntrySchema>;

const ProductListItemTypeOverrideSchema = z.object({
   itemType: z.string().nullable().optional(),
   title: z.string().nullable().optional(),
   description: z.string().nullable().optional(),
   metaDescription: z.string().nullable().optional(),
   metaTitle: z.string().nullable().optional(),
   tagline: z.string().nullable().optional(),
});

const ProductListItemTypeOverrideIndexedSchema = z.record(
   ProductListItemTypeOverrideSchema
);

export type ProductListItemTypeOverride = z.infer<
   typeof ProductListItemTypeOverrideSchema
>;

export type ProductListItemTypeOverrideIndexed = z.infer<
   typeof ProductListItemTypeOverrideIndexedSchema
>;

const ProductListOverridesSchema = z.object({
   title: z.string(),
   description: z.string(),
   metaDescription: z.string(),
   metaTitle: z.string(),
   tagline: z.string().nullable(),
});

export type ProductListOverrides = z.infer<typeof ProductListOverridesSchema>;

const BaseProductListSchema = z.object({
   id: z.string().nullable(),
   title: z.string(),
   h1: z.string().nullable(),
   handle: z.string(),
   deviceTitle: z.string().nullable(),
   tagline: z.string().nullable(),
   description: z.string().nullable(),
   metaDescription: z.string().nullable(),
   metaTitle: z.string().nullable(),
   defaultShowAllChildrenOnLgSizes: z.boolean().nullable(),
   filters: z.string().nullable(),
   optionalFilters: z.string().nullable(),
   forceNoindex: z.boolean().nullable(),
   heroImage: ImageSchema.nullable(),
   brandLogo: ImageSchema.nullable(),
   ancestors: z.array(ProductListAncestorSchema),
   children: z.array(ProductListChildSchema),
   sections: z.array(ProductListSectionSchema),
   algolia: z.object({
      apiKey: z.string(),
   }),
   wikiInfo: z.array(WikiInfoEntrySchema),
   isOnStrapi: z.boolean(),
   itemOverrides: ProductListItemTypeOverrideIndexedSchema,
});
export type BaseProductList = z.infer<typeof BaseProductListSchema>;

const AllPartsProductListSchema = BaseProductListSchema.extend({
   type: z.literal(ProductListType.AllParts),
});
export type AllPartsProductList = z.infer<typeof AllPartsProductListSchema>;

const DevicePartsProductListSchema = BaseProductListSchema.extend({
   type: z.literal(ProductListType.DeviceParts),
});
export type DevicePartsProductList = z.infer<
   typeof DevicePartsProductListSchema
>;

const AllToolsProductListSchema = BaseProductListSchema.extend({
   type: z.literal(ProductListType.AllTools),
});
export type AllToolsProductList = z.infer<typeof AllToolsProductListSchema>;

const ToolsCategoryProductListSchema = BaseProductListSchema.extend({
   type: z.literal(ProductListType.ToolsCategory),
});
export type ToolsCategoryProductList = z.infer<
   typeof ToolsCategoryProductListSchema
>;

const MarketingProductListSchema = BaseProductListSchema.extend({
   type: z.literal(ProductListType.Marketing),
});
export type MarketingProductList = z.infer<typeof MarketingProductListSchema>;

export const ProductListSchema = z.union([
   AllPartsProductListSchema,
   DevicePartsProductListSchema,
   AllToolsProductListSchema,
   ToolsCategoryProductListSchema,
   MarketingProductListSchema,
]);
export type ProductList = z.infer<typeof ProductListSchema>;
