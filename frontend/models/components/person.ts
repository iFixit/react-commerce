import type { PersonFieldsFragment } from '@lib/strapi-sdk';
import { z } from 'zod';
import { imageFromStrapi, ImageSchema } from './image';

export type Person = z.infer<typeof PersonSchema>;

export const PersonSchema = z.object({
   id: z.string(),
   name: z.string(),
   role: z.string().nullable(),
   avatar: ImageSchema.nullable(),
});

export function personFromStrapiFragment(
   fragment: PersonFieldsFragment | null | undefined
): Person | null {
   const id = fragment?.id;
   const name = fragment?.name ?? null;
   const role = fragment?.role ?? null;

   if (id == null || name == null) return null;

   return {
      id,
      name,
      role,
      avatar: imageFromStrapi(fragment?.avatar),
   };
}
