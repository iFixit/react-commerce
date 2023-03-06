import type { CallToActionFieldsFragment } from '@lib/strapi-sdk';
import { z } from 'zod';

export const CallToActionSchema = z.object({
   title: z.string(),
   url: z.string(),
});

export type CallToAction = z.infer<typeof CallToActionSchema>;

export function callToActionFromStrapi(
   fragment: CallToActionFieldsFragment | null | undefined
): CallToAction | null {
   const title = fragment?.title;
   const url = fragment?.url;

   if (title == null || url == null) return null;

   return { title, url };
}
