export interface ProductSearchHit {
   title: string;
   handle: string;
   price_float: number;
   compare_at_price?: number;
   sku: string;
   image_url: string;
   short_description?: string;
   quantity_available: number;
   lifetime_warranty: boolean;
   rating: number;
}

export interface ProductList {
   handle: string;
   deviceTitle: string | null;
   title: string;
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
   handle: string;
   title: string;
}

export interface ProductListChild {
   handle: string;
   title: string;
   image: ProductListImage | null;
   sortPriority: number | null;
}

export interface ProductListImage {
   alternativeText: string | null;
   url: string;
   formats: any;
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
   description: string;
   image: ProductListImage | null;
}
