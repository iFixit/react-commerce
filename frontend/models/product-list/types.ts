export interface ProductSearchHit {
   objectID: string;
   title: string;
   group_title: string;
   handle: string;
   price_float: number;
   compare_at_price?: number;
   price_tiers?: Record<string, string>;
   sku: string;
   image_url: string;
   short_description?: string;
   quantity_available: number;
   lifetime_warranty: boolean;
   rating: number;
   rating_count: number;
   url: string;
   is_pro: number;
}

export interface ProductList {
   title: string;
   handle: string;
   path: string;
   deviceTitle: string | null;
   tagline: string | null;
   description: string;
   metaDescription: string | null;
   filters: string | null;
   image: ProductListImage | null;
   ancestors: ProductListAncestor[];
   children: ProductListChild[];
   sections: ProductListSection[];
}

export interface ProductListAncestor {
   title: string;
   handle: string;
   path: string;
}

export interface ProductListChild {
   title: string;
   handle: string;
   path: string;
   image: ProductListImage | null;
   sortPriority: number | null;
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
   productList: ProductListPreview;
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
   path: string;
   deviceTitle: string | null;
   description: string;
   image: ProductListImage | null;
   filters: string | null;
}
