import { z } from 'zod';

const PriceTierSchema = z.object({
   default_variant_price: z.union([z.string(), z.number()]),
   min: z.union([z.string(), z.number()]),
   max: z.union([z.string(), z.number()]),
});
export type PriceTier = z.infer<typeof PriceTierSchema>;

const ProductSearchHitSchema = z.object({
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
}).passthrough();
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
const FacetWidgetTypeZodNativeEnum = z.nativeEnum(FacetWidgetType);

export enum ProductListSectionType {
   Banner = 'banner',
   RelatedPosts = 'related-posts',
   ProductListSet = 'product-list-set',
}
const ProductListSectionTypeZodNativeEnum = z.nativeEnum(
   ProductListSectionType
);

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

export type ProductList =
   | AllPartsProductList
   | DevicePartsProductList
   | AllToolsProductList
   | ToolsCategoryProductList
   | MarketingProductList;

export type iFixitPage = StorePage;

export interface BaseProductList {
   id: string | null;
   title: string;
   h1: string | null;
   handle: string;
   deviceTitle: string | null;
   tagline: string | null;
   description: string;
   metaDescription: string | null;
   metaTitle: string | null;
   defaultShowAllChildrenOnLgSizes: boolean | null;
   filters: string | null;
   forceNoindex: boolean | null;
   heroImage: ProductListImage | null;
   image: ProductListImage | null;
   brandLogo: ProductListImage | null;
   brandLogoWidth: number | null;
   ancestors: ProductListAncestor[];
   children: ProductListChild[];
   sections: ProductListSection[];
   algolia: {
      apiKey: string;
   };
   wikiInfo: WikiInfoEntry[];
   isOnStrapi: boolean;
}

interface AllPartsProductList extends BaseProductList {
   type: ProductListType.AllParts;
}

interface DevicePartsProductList extends BaseProductList {
   type: ProductListType.DeviceParts;
}

interface AllToolsProductList extends BaseProductList {
   type: ProductListType.AllTools;
}

interface ToolsCategoryProductList extends BaseProductList {
   type: ProductListType.ToolsCategory;
}

interface MarketingProductList extends BaseProductList {
   type: ProductListType.Marketing;
}

interface StorePage extends BaseProductList {
   type: iFixitPageType.Store;
}

export type ProductListSection =
   | ProductListBannerSection
   | ProductListRelatedPostsSection
   | ProductListProductListSetSection;

export interface ProductListBannerSection {
   type: ProductListSectionType.Banner;
   id: string;
   title: string;
   description: string;
   callToActionLabel: string;
   url: string;
}

export interface ProductListRelatedPostsSection {
   type: ProductListSectionType.RelatedPosts;
   id: string;
   tags: string | null;
}

export interface ProductListProductListSetSection {
   type: ProductListSectionType.ProductListSet;
   id: string;
   title: string;
   productLists: ProductListPreview[];
}

export interface ProductListPreview {
   handle: string;
   title: string;
   type: ProductListType;
   deviceTitle: string | null;
   description: string;
   image: ProductListImage | null;
   filters: string | null;
}
