import { IFixitAPIClient } from '@ifixit/ifixit-api-client';

export type BuyBoxVariant = {
   sku: string;
   optionid: number;
   productURL: string;
   price: string;
   currency: string;
   avail: number;
   salesChannel: string;
   gaSku: string;
};

export type BuyBoxResponse = {
   countryCode: string;
   storeid: string;
   storeName: string;
   storeUrl: string;
   salesChannel: string;
   // Keyed by optionid
   products: Record<string, BuyBoxVariant>;
};

export function getBuyBoxForProduct(
   client: IFixitAPIClient,
   productcode: string
): Promise<BuyBoxResponse | null> {
   // TODO pull country override from browser url
   return client.getJson(
      `internal/international_store_promotion/buybox?productcode=${productcode}`,
      'international-store-promotion-buybox'
   );
}
