import { FetchError, IFixitAPIClient } from '@ifixit/ifixit-api-client';
import { captureException } from '@ifixit/sentry';
import { z } from 'zod';

const IFixitFindProductQuerySchema = z.object({
   variantOptions: z.record(z.array(z.string())),
   compatibilityNotes: z.array(z.string()),
   redirectSkuUrl: z.string().nullable(),
});
export type IFixitFindProductQuery = z.infer<
   typeof IFixitFindProductQuerySchema
>;

export async function fetchProductData(
   client: IFixitAPIClient,
   handle: string
): Promise<IFixitFindProductQuery | null> {
   const productHandle = encodeURIComponent(handle);
   if (!productHandle) return null;
   let response;
   try {
      response = await client.get(
         `store/product/${productHandle}`,
         'product-data'
      );
   } catch (e) {
      if (!(e instanceof FetchError) || e.response.status !== 404) throw e;
      return null;
   }
   const parsed = IFixitFindProductQuerySchema.safeParse(response);
   if (!parsed.success) {
      console.error(
         'Invalid product data from iFixit API',
         response,
         parsed.error
      );
      captureException('Invalid product data from iFixit API', {
         extra: {
            response,
            parsing_error: parsed.error,
         },
      });
      return null;
   }
   return parsed.data;
}
