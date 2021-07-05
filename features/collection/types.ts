export interface Collection {
   handle: string;
   title: string;
   description?: string;
   image?: Image;
   ancestors: Collection[];
   children: Collection[];
}

export interface Image {
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

export interface NewsStory {
   objectID: string;
   post_title: string;
   post_date: number;
   images: Record<string, NewsStoryHitImage>;
   permalink: string;
   taxonomies: NewStoryTaxonomies;
}

export interface NewsStoryHitImage {
   url: string;
   width: number;
   height: number;
}

export interface NewStoryTaxonomies {
   category: string[];
   language: string[];
}
