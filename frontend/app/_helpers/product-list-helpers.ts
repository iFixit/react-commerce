import {
   stylizeDeviceItemType,
   stylizeDeviceTitle,
} from '@helpers/product-list-helpers';
import { useFacets } from '@templates/product-list/sections/FilterableProductsSection/facets/useFacets';

export function getDeviceCanonicalPath(
   deviceTitle: string | null | undefined,
   itemType: string | null
) {
   if (deviceTitle == null) {
      return null;
   }
   const slug = itemType
      ? `/${encodeURIComponent(stylizeDeviceItemType(itemType))}`
      : '';
   const canonicalDeviceHandle = encodeURIComponent(
      stylizeDeviceTitle(deviceTitle)
   );
   return `/Parts/${canonicalDeviceHandle}${slug}`;
}

export interface ProductListPageSearchParams {
   p?: string;
   q?: string;
   [key: string]: string | string[] | undefined;
}

export function parseSearchParams(searchParams: ProductListPageSearchParams) {
   // eslint-disable-next-line react-hooks/rules-of-hooks
   const facets = useFacets();
   const page = searchParams.p ? parseInt(searchParams.p) : 1;
   const query = searchParams.q ?? '';
   const refinements: Record<string, string[]> = {};

   facets.forEach((facet) => {
      const filterValues = searchParams[facet];
      if (filterValues) {
         refinements[facet] = Array.isArray(filterValues)
            ? filterValues
            : [filterValues];
      }
   });

   return { page, query, refinements };
}
