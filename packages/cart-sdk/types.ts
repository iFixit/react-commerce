import { Money } from '@ifixit/helpers';

export type CartAPIResponse = {
   cart: APICart;
};

export type Cart = {
   hasItemsInCart: boolean;
   lineItems: CartLineItem[];
   totals: {
      discount: Money<number> | null;
      itemsCount: number;
      price: Money;
      compareAtPrice?: Money | null | undefined;
   };
};

export type CartLineItem = {
   itemcode: string;
   shopifyVariantId: string;
   name: string;
   internalDisplayName?: string;
   imageSrc?: string | null;
   quantity: number;
   maxToAdd?: number;
   price: Money;
   compareAtPrice?: Money | null;
};

export type APICart = {
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
};

type APIPriceItem = {
   name: string;
   amount: string;
   amountStr: string;
};

export type APICartProduct = {
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
};

export type MiniCartProduct = {
   displayName: string;
   imageUrl: string;
   price: number;
   priceText: string;
   quantity: number;
   shortDisplayName: string;
   sku: string;
   url: string;
   variantId: string;
};
