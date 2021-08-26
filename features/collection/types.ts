export interface Collection {
   handle: string;
   title: string;
   description?: string;
   filtersPreset?: string | null;
   image?: CollectionImage | null;
   ancestors: Collection[];
   children: Collection[];
   relatedPosts?: Post[];
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
