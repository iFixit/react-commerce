import type { ToolFieldsFragment } from '@lib/strapi-sdk';
import { z } from 'zod';
import { ImageSchema, imageFromStrapi } from './image';

export type Tool = z.infer<typeof ToolSchema>;

export const ToolSchema = z.object({
   id: z.string(),
   title: z.string(),
   description: z.string(),
   image: ImageSchema,
   trace: ImageSchema,
   top: z.number(),
   left: z.number(),
   width: z.number(),
   height: z.number(),
});

export function toolsFromStrapiFragment(
   fragment: ToolFieldsFragment | null | undefined
): Tool | null {
   const id = fragment?.id;
   const attributes = fragment?.attributes;

   if (id == null || attributes == null) return null;

   const { title, description, image, trace, top, left, width, height } =
      attributes;
   const parsedImage = imageFromStrapi(image);
   const parsedTrace = imageFromStrapi(trace);

   if (
      title == null ||
      description == null ||
      image == null ||
      trace == null ||
      parsedImage == null ||
      parsedTrace == null
   )
      return null;

   return {
      id,
      title,
      description,
      image: parsedImage,
      trace: parsedTrace,
      top: top ?? 0,
      left: left ?? 0,
      width: width ?? 0,
      height: height ?? 0,
   };
}
