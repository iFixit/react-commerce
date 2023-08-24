import type { Money } from '@ifixit/helpers';

export interface CartAPIResponse {
   cart: APICart;
}

export interface Cart {
   hasItemsInCart: boolean;
   lineItems: CartLineItem[];
   totals: {
      discount: Money<number> | null;
      itemsCount: number;
      price: Money;
      compareAtPrice?: Money | null | undefined;
   };
   crossSellProducts: CrossSellProduct[];
}

export interface CartLineItem {
   itemcode: string;
   variantTitle: string;
   shopifyVariantId: string;
   name: string;
   internalDisplayName?: string;
   imageSrc?: string | null;
   quantity: number;
   maxToAdd?: number;
   price: Money;
   compareAtPrice?: Money | null;
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
   crossSellProducts: APICrossSellProduct[];
}
export interface CrossSellProduct {
   marketingHeading: string | null;
   marketingTitle: string | null;
   marketingBlurb: string | null;
   itemcode: string;
   shopifyVariantId: string;
   name: string;
   imageSrc?: string | null;
   price: Money;
   compareAtPrice?: Money | null;
   proPricesByTier?: Record<string, Money> | null;
   handle: string;
}

interface APICrossSellProduct {
   compare_at_price: string | null;
   handle: string;
   imageSrc: string | null;
   itemcode: string;
   marketing_heading: string | null;
   marketing_title: string | null;
   name: string;
   price_tiers: Record<string, number> | null;
   product_blurb: string | null;
   subPrice: string | null;
   url: string | null;
   variant_id: number;
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
   retailDiscount: string;
   subPrice: string;
   subPriceStr: string;
   subTotal: string;
   subTotalStr: string;
   variant: string;
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
