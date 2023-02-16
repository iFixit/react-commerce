export interface ProductSearchHit {
   objectID: string;
   title: string;
   handle: string;
   price_float: number;
   compare_at_price?: number;
   price_tiers?: Record<string, PriceTier>;
   sku: string;
   image_url: string;
   short_description?: string;
   quantity_available: number;
   lifetime_warranty: boolean;
   oem_partnership: string | null;
   rating: number;
   rating_count: number;
   url: string;
   is_pro: number;
   [attribute: string]: unknown;
}

export type PriceTier = {
   default_variant_price: string | number;
   min: string | number;
   max: string | number;
};

export type WikiInfoEntry = {
   name: string;
   value: string;
   inheritedFrom: string | null;
};

export enum ProductListType {
   AllParts = 'parts',
   DeviceParts = 'device-parts',
   AllTools = 'tools',
   ToolsCategory = 'tools-category',
   Marketing = 'marketing',
}

export enum iFixitPageType {
   Store = 'store',
}

export enum FacetWidgetType {
   RefinementList = 'refinement-list',
   Menu = 'menu',
}

export type ProductList =
   | AllPartsProductList
   | DevicePartsProductList
   | AllToolsProductList
   | ToolsCategoryProductList
   | MarketingProductList;

export type iFixitPage = StorePage;

export interface BaseProductList {
   title: string;
   handle: string;
   deviceTitle: string | null;
   deviceItemType: string | null;
   tagline: string | null;
   description: string;
   metaDescription: string | null;
   metaTitle: string | null;
   defaultShowAllChildrenOnLgSizes: boolean | null;
   filters: string | null;
   forceNoindex: boolean | null;
   image: ProductListImage | null;
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

export interface ProductListAncestor {
   deviceTitle: string | null;
   title: string;
   type: ProductListType | iFixitPageType;
   handle: string;
}

export interface ProductListChild {
   title: string;
   deviceTitle: string | null;
   handle: string;
   image: ProductListImage | null;
   sortPriority: number | null;
   type: ProductListType;
}

export interface ProductListImage {
   alternativeText: string | null;
   url: string;
}

export enum ProductListSectionType {
   Banner = 'banner',
   RelatedPosts = 'related-posts',
   FeaturedProductList = 'featured-product-list',
   ProductListSet = 'product-list-set',
}

export type ProductListSection =
   | ProductListBannerSection
   | ProductListRelatedPostsSection
   | ProductListFeaturedProductListSection
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

export interface ProductListFeaturedProductListSection {
   type: ProductListSectionType.FeaturedProductList;
   id: string;
   productList: FeaturedProductList;
}

export interface FeaturedProductList {
   algolia: {
      apiKey: string;
      indexName: string;
   };
   handle: string;
   title: string;
   type: ProductListType;
   deviceTitle: string | null;
   description: string;
   image: ProductListImage | null;
   filters: string | null;
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
