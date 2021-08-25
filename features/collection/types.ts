export interface Collection {
   handle: string;
   title: string;
   description?: string;
   filtersPreset?: string | null;
   image?: CollectionImage | null;
   ancestors: Collection[];
   children: Collection[];
}

export interface CollectionImage {
   url: string;
   alt?: string;
}

export interface Hit {
   title: string;
   handle: string;
   price: number;
   compare_at_price?: number;
   sku: string;
   product_image: string;
   body_html_safe?: string;
}
