import { parseJSONMetafield } from '@helpers/storefront-helpers';
import { z } from 'zod';

export type Breadcrumb = z.infer<typeof BreadcrumbSchema>;

export const BreadcrumbSchema = z.object({
   label: z.string(),
   url: z.string(),
});

export function breadcrumbsFromMetafield(
   value: string | null | undefined
): Breadcrumb[] {
   const json = parseJSONMetafield(value);

   const validation = z.array(BreadcrumbSchema).safeParse(json);
   if (validation.success) {
      return validation.data;
   }
   return [];
}

export function isCurrentPageBreadcrumbMissing(
   breadcrumbs: Breadcrumb[],
   currentPageTitle: string
) {
   if (breadcrumbs.length === 0) return true;

   const lastBreadcrumb = breadcrumbs[breadcrumbs.length - 1];
   return lastBreadcrumb.label.toLowerCase() !== currentPageTitle.toLowerCase();
}

export function appendCurrentPageBreadcrumb(
   breadcrumbs: Breadcrumb[],
   currentPageTitle: string
) {
   return breadcrumbs.concat([
      {
         label: currentPageTitle,
         url: '#',
      },
   ]);
}
