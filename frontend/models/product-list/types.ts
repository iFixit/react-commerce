import { z } from 'zod';

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

export enum ProductListType {
   AllParts = 'parts',
   DeviceParts = 'device-parts',
   AllTools = 'tools',
   ToolsCategory = 'tools-category',
   Marketing = 'marketing',
}
const ProductListTypeZodNativeEnum = z.nativeEnum(ProductListType);

const ProductListImageSchema = z.object({
   alternativeText: z.string().nullable(),
   url: z.string(),
});
export type ProductListImage = z.infer<typeof ProductListImageSchema>;

export enum iFixitPageType {
   Store = 'store',
}
const iFixitPageTypeZodNativeEnum = z.nativeEnum(iFixitPageType);

export enum FacetWidgetType {
   RefinementList = 'refinement-list',
   Menu = 'menu',
}

export enum ProductListSectionType {
   Banner = 'banner',
   RelatedPosts = 'related-posts',
   ProductListSet = 'product-list-set',
   ItemTypeOverride = 'item-type-override',
}
const ProductListAncestorSchema = z.object({
   deviceTitle: z.string().nullable(),
   title: z.string(),
   type: z.union([ProductListTypeZodNativeEnum, iFixitPageTypeZodNativeEnum]),
   handle: z.string(),
});
export type ProductListAncestor = z.infer<typeof ProductListAncestorSchema>;

const ProductListChildSchema = z.object({
   title: z.string(),
   deviceTitle: z.string().nullable(),
   handle: z.string(),
   image: ProductListImageSchema.nullable(),
   sortPriority: z.number().nullable(),
   type: ProductListTypeZodNativeEnum,
});
export type ProductListChild = z.infer<typeof ProductListChildSchema>;

const ProductListPreviewSchema = z.object({
   handle: z.string(),
   title: z.string(),
   type: ProductListTypeZodNativeEnum,
   deviceTitle: z.string().nullable(),
   description: z.string(),
   image: ProductListImageSchema.nullable(),
   filters: z.string().nullable(),
});
export type ProductListPreview = z.infer<typeof ProductListPreviewSchema>;

const ProductListBannerSectionSchema = z.object({
   type: z.literal(ProductListSectionType.Banner),
   id: z.string(),
   title: z.string(),
   description: z.string(),
   callToActionLabel: z.string(),
   url: z.string(),
});
export type ProductListBannerSection = z.infer<
   typeof ProductListBannerSectionSchema
>;

const ProductListRelatedPostsSectionSchema = z.object({
   type: z.literal(ProductListSectionType.RelatedPosts),
   id: z.string(),
   tags: z.string().nullable(),
});
export type ProductListRelatedPostsSection = z.infer<
   typeof ProductListRelatedPostsSectionSchema
>;

const ProductListProductListSetSectionSchema = z.object({
   type: z.literal(ProductListSectionType.ProductListSet),
   id: z.string(),
   title: z.string(),
   productLists: z.array(ProductListPreviewSchema),
});
export type ProductListProductListSetSection = z.infer<
   typeof ProductListProductListSetSectionSchema
>;

const ProductListSectionSchema = z.union([
   ProductListBannerSectionSchema,
   ProductListRelatedPostsSectionSchema,
   ProductListProductListSetSectionSchema,
]);
export type ProductListSection = z.infer<typeof ProductListSectionSchema>;

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
   title: z.string().optional(),
   description: z.string().optional(),
   metaDescription: z.string().optional(),
   metaTitle: z.string().optional(),
   tagline: z.string().optional(),
});

export type ProductListOverrides = z.infer<typeof ProductListOverridesSchema>;

const BaseProductListSchema = z.object({
   id: z.string().nullable(),
   title: z.string(),
   h1: z.string().nullable(),
   handle: z.string(),
   deviceTitle: z.string().nullable(),
   tagline: z.string().nullable(),
   description: z.string(),
   metaDescription: z.string().nullable(),
   metaTitle: z.string().nullable(),
   defaultShowAllChildrenOnLgSizes: z.boolean().nullable(),
   filters: z.string().nullable(),
   forceNoindex: z.boolean().nullable(),
   heroImage: ProductListImageSchema.nullable(),
   image: ProductListImageSchema.nullable(),
   brandLogo: ProductListImageSchema.nullable(),
   brandLogoWidth: z.number().nullable(),
   ancestors: z.array(ProductListAncestorSchema),
   children: z.array(ProductListChildSchema),
   sections: z.array(ProductListSectionSchema),
   algolia: z.object({
      apiKey: z.string(),
   }),
   wikiInfo: z.array(WikiInfoEntrySchema),
   isOnStrapi: z.boolean(),
   itemOverrides: ProductListItemTypeOverrideIndexedSchema,
   overrides: ProductListOverridesSchema.optional(),
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

const StorePageSchema = BaseProductListSchema.extend({
   type: z.literal(iFixitPageType.Store),
});
export type StorePage = z.infer<typeof StorePageSchema>;

export const ProductListSchema = z.union([
   AllPartsProductListSchema,
   DevicePartsProductListSchema,
   AllToolsProductListSchema,
   ToolsCategoryProductListSchema,
   MarketingProductListSchema,
]);
export type ProductList = z.infer<typeof ProductListSchema>;
