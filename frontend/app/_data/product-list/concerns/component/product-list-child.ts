import { ImageSchema } from '@/models/concerns/components/image';
import { z } from 'zod';
import { ProductListTypeSchema } from './product-list-type';

export type ProductListChild = z.infer<typeof ProductListChildSchema>;

export const ProductListChildSchema = z.object({
   title: z.string(),
   deviceTitle: z.string().nullable(),
   handle: z.string(),
   image: ImageSchema.nullable(),
   sortPriority: z.number().nullable(),
   type: ProductListTypeSchema,
});
