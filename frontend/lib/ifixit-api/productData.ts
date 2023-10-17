import { IFixitAPIClient } from '@ifixit/ifixit-api-client';
import { invariant } from '@ifixit/helpers';

export type ProductDataApiResponse = {
   variantOptions: {
      [o_code: string]: string[];
   };
   compatibilityNotes: string[];
};

export async function fetchProductData(
   client: IFixitAPIClient,
   handle: string
): Promise<ProductDataApiResponse | null> {
   const productHandle = encodeURIComponent(handle);
   try {
      invariant(
         productHandle.length > 0,
         'productHandle cannot be a blank string'
      );
      return await client.getJson(
         `store/product/${productHandle}`,
         'product-data'
      );
   } catch (error: any) {
      return null;
   }
}
