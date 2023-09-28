import { parseJSONMetafield } from '@helpers/storefront-helpers';
import { printZodError } from '@helpers/zod-helpers';
import { z } from 'zod';

export type ProductVideo = z.infer<typeof ProductVideosSchema>;

export const ProductVideosSchema = z.object({
   id: z.string(),
   service: z.string(),
});

export function productVideoFromMetafield(
   value: string | null | undefined
): ProductVideo | null {
   const json = parseJSONMetafield(value);
   if (json == null) {
      return null;
   }
   const result = ProductVideosSchema.safeParse(json);
   if (result.success) {
      return result.data;
   }
   printZodError(result.error, 'product_videos_json metafield');
   return null;
}
