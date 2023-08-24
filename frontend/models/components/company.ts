import type { CompanyFieldsFragment } from '@lib/strapi-sdk';
import { z } from 'zod';
import { imageFromStrapi, ImageSchema } from './image';

export const CompanySchema = z.object({
   name: z.string(),
   logo: ImageSchema,
});

export type Company = z.infer<typeof CompanySchema>;

export function companyFromStrapi(
   fragment: CompanyFieldsFragment | null | undefined
): Company | null {
   const name = fragment?.attributes?.name;
   const logo = imageFromStrapi(fragment?.attributes?.logo);

   if (name == null || logo == null) {
      console.warn('company name and/or logo missing!');
      return null;
   }

   return { name, logo };
}
