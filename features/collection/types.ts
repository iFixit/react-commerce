export interface Collection {
   handle: string;
   title: string;
   description?: string;
   image?: CollectionImage;
   ancestors: Collection[];
   children: Collection[];
   relatedNews?: News[];
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

export interface News {
   id: number;
   title: string;
   date: string;
   image: NewsImage | null;
   permalink: string;
   category: string;
}

export interface NewsImage {
   url: string;
}
