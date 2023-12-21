import { IFixitAPIClient } from '@ifixit/ifixit-api-client';
import { captureException } from '@ifixit/sentry';
import { z } from 'zod';

const iFixitFindProductQuerySchema = z.object({
   variantOptions: z.record(z.array(z.string())),
   compatibilityNotes: z.array(z.string()),
});
export type iFixitFindProductQuery = z.infer<
   typeof iFixitFindProductQuerySchema
>;

export async function fetchProductData(
   client: IFixitAPIClient,
   handle: string
): Promise<iFixitFindProductQuery | null> {
   const productHandle = encodeURIComponent(handle);
   if (!productHandle) return null;
   const response = await client.get(
      `store/product/${productHandle}`,
      'product-data'
   );
   const parsed = iFixitFindProductQuerySchema.safeParse(response);
   if (!parsed.success) {
      console.error('Invalid product data response', response, parsed.error);
      captureException('Invalid product data response', {
         extra: {
            response,
            parsing_error: parsed.error,
         },
      });
      return null;
   }
   return parsed.data;
}
