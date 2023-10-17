import { DEFAULT_STORE_CODE } from '@config/env';
import { invariant, isRecord } from '@ifixit/helpers';
import { IFixitAPIClient } from '@ifixit/ifixit-api-client';

export type ProductReviewData = Partial<{
   average: number;
   count: number;
   groupedReviews: Record<string, number>;
   reviews: ProductReview[];
}>;

export type ProductReview = Partial<{
   author: Partial<ReviewAuthor>;
   body: string;
   created_date: number;
   date: string;
   headline: null | string;
   langid: 'en';
   modified_date: number;
   productName: string;
   productVariantName: string;
   sku: string;
   rating: number;
   reviewid: number;
}>;

export type ReviewAuthor = {
   userid: number;
   name: string;
   avatar: string;
   url: string;
   canEdit: boolean;
};

export async function fetchProductReviews(
   apiClient: IFixitAPIClient,
   productId: string
): Promise<ProductReviewData | null> {
   const response = await apiClient.getJson(
      // TODO: get store code from user session or fall back to default
      `reviews/${productId}?storeCode=${DEFAULT_STORE_CODE}`,
      'product-reviews'
   );

   invariant(isRecord(response), 'unexpected api response');
   return response;
}
