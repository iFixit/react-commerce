import type { ToolFieldsFragment } from '@lib/strapi-sdk';
import { z } from 'zod';
import { ImageSchema, imageFromStrapi } from './image';

export type Tool = z.infer<typeof ToolSchema>;

export const ToolSchema = z.object({
   id: z.string(),
   title: z.string(),
   description: z.string(),
   image: ImageSchema.nullable(),
   trace: ImageSchema.nullable(),
});

export function toolsFromStrapiFragment(
   fragment: ToolFieldsFragment | null | undefined
): Tool | null {
   const id = fragment?.id;
   const attributes = fragment?.attributes;

   if (id == null || attributes == null) return null;

   const { title, description, image, trace } = attributes;

   if (title == null || description == null || image == null || trace == null)
      return null;

   return {
      id,
      title,
      description,
      image: imageFromStrapi(image),
      trace: imageFromStrapi(trace),
   };
}
