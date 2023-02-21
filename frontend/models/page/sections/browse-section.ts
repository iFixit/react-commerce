import { ProductListType } from '@models/product-list';
import { ImageSchema } from '@models/shared/components/image';
import { z } from 'zod';

export type BrowseSection = z.infer<typeof BrowseSectionSchema>;

export const BrowseCategorySchema = z.object({
   id: z.string(),
   type: z.nativeEnum(ProductListType),
   handle: z.string(),
   title: z.string(),
   deviceTitle: z.string().nullable(),
   metaDescription: z.string().nullable(),
   image: ImageSchema.nullable(),
});

export type BrowseCategory = z.infer<typeof BrowseCategorySchema>;

export const BrowseSectionSchema = z.object({
   type: z.literal('Browse'),
   id: z.string(),
   title: z.string().nullable(),
   description: z.string().nullable(),
   image: ImageSchema.nullable(),
   categories: z.array(BrowseCategorySchema),
});
