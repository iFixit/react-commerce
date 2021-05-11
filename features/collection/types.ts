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

export interface Hit {
   title: string;
   handle: string;
   price: number;
   compare_at_price?: number;
   sku: string;
   product_image: string;
}
