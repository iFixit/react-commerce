import { SearchState } from './types';
import { filterListNullableItems } from './utils';

export function useFiltersQueryString(state: SearchState) {
   return getFiltersQuery(state);
}

export function getFiltersQuery(
   state: SearchState,
   filterId?: string
): string | undefined {
   if (filterId == null) {
      const filters: string[] = [];
      if (state.params.rawFilters != null && state.params.rawFilters !== '') {
         filters.push(state.params.rawFilters);
      }
      if (state.params.filters?.rootIds.length > 0) {
         const rootQueries = filterListNullableItems(
            state.params.filters.rootIds.map((id) => getFiltersQuery(state, id))
         );
         if (rootQueries.length > 0) {
            filters.push(rootQueries.join(' AND '));
         }
      }
      if (filters.length > 0) {
         return filters.join(' AND ');
      }
      return undefined;
   }
   const filter = state.params.filters.byId[filterId];
   if (filter == null) {
      throw new Error(`filter "${filterId}" not found`);
   }
   switch (filter.type) {
      case 'or': {
         if (filter.filterIds.length === 0) {
            return undefined;
         }
         return `(${filterListNullableItems(
            filter.filterIds.map((id) => getFiltersQuery(state, id))
         ).join(' OR ')})`;
      }
      case 'and': {
         if (filter.filterIds.length === 0) {
            return undefined;
         }
         return `(${filterListNullableItems(
            filter.filterIds.map((id) => getFiltersQuery(state, id))
         ).join(' AND ')})`;
      }
      case 'basic': {
         const facet = state.facets.byId[filter.facetName].name;
         const value = state.facetValues.byId[filter.valueId].value;
         return `"${facet}":"${value}"`;
      }
      case 'numeric-comparison': {
         return `"${filter.facetName}" ${filter.operator} ${filter.value}`;
      }
      case 'numeric-range': {
         return `"${filter.facetName}":${filter.range.min} TO ${filter.range.max}`;
      }
   }
}
