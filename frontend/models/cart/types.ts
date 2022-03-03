export interface CartAPIResponse {
   cart: APICart | null;
}

export interface APICart {
   couponName: string;
   hasCoupon: boolean;
   hasCustomer: boolean;
   totalNumItems: number;
   totals: {
      couponAmount: APIPriceItem;
      discount: APIPriceItem;
      hasFreeShippingOption: boolean;
      hasPriceDiscount: boolean;
      shipping: APIPriceItem;
      subtotal: APIPriceItem;
      tax: APIPriceItem;
      total: APIPriceItem;
   };
   products: APICartProduct[];
   miniCart: {
      products: MiniCartProduct[];
   };
}

interface APIPriceItem {
   name: string;
   amount: string;
   amountStr: string;
}

export interface APICartProduct {
   discount: string;
   imageSrc: string;
   itemcode: string;
   maxToAdd: number;
   name: string;
   quantity: number;
   subPrice: string;
   subPriceStr: string;
   subTotal: string;
   subTotalStr: string;
}

export interface MiniCartProduct {
   displayName: string;
   imageUrl: string;
   price: number;
   priceText: string;
   quantity: number;
   shortDisplayName: string;
   sku: string;
   url: string;
   variantId: string;
}
