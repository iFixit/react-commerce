export interface Collection {
   handle: string;
   title: string;
   description?: string;
   filtersPreset?: string | null;
   image?: CollectionImage | null;
   ancestors: Collection[];
   children: Collection[];
   relatedPosts?: Post[];
   sections: CollectionSection[];
}

export interface CollectionImage {
   url: string;
   alt?: string;
}

export interface ProductHit {
   title: string;
   handle: string;
   price: number;
   compare_at_price?: number;
   sku: string;
   product_image: string;
   body_html_safe?: string;
}

export interface Post {
   id: number;
   title: string;
   date: string;
   image: PostImage | null;
   permalink: string;
   category: string;
}

export interface PostImage {
   url: string;
}

// Sections

export type CollectionSection =
   | BannerSection
   | RelatedPostsSection
   | NewsletterFormSection;

export interface BannerSection {
   __typename: 'ComponentCollectionBanner';
   id: string;
   title: string;
   description: string;
   callToActionLabel: string;
   url: string;
}

export interface RelatedPostsSection {
   __typename: 'ComponentCollectionRelatedPosts';
   id: string;
   tags?: string;
}

export interface NewsletterFormSection {
   __typename: 'ComponentCollectionNewsletterForm';
   id: string;
   title: string;
   description: string;
   callToActionLabel: string;
   inputPlaceholder?: string;
}
