import { ALGOLIA_PRODUCT_INDEX_NAME } from '@config/env';
import { ProductListType } from '@models/product-list';
import map from 'lodash/map';
import { MultipleQueriesQuery } from './algolia';

export function createQuery(
   query: string,
   params: MultipleQueriesQuery['params']
): MultipleQueriesQuery {
   return {
      indexName: ALGOLIA_PRODUCT_INDEX_NAME,
      query,
      params,
   };
}

export function createFacetFilters(refinements: Record<string, string[]>) {
   return map(refinements, (values, facet) => {
      return values.map((value) => `${facet}:${value}`);
   });
}

export function createFilters({
   productListType,
   baseFilters,
   excludePro,
}: {
   productListType: ProductListType;
   baseFilters: string;
   excludePro: boolean;
}) {
   const filters: string[] = baseFilters ? [baseFilters] : [];

   filters.push('public=1');
   if (excludePro) {
      filters.push('is_pro!=1');
   }

   switch (productListType) {
      case ProductListType.AllParts:
         filters.push("'facet_tags.Main Category': 'Parts'");
         break;
      case ProductListType.AllTools:
         filters.push("'facet_tags.Main Category': 'Tools'");
         break;
   }
   console.log('filters', filters);
   return filters.join(' AND ');
}
