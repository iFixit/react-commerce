import { assertNever } from '@lib/utils';
import { SearchState } from './types';

export function useFiltersQueryString(state: SearchState) {
   const filters = Object.keys(state.params.filtersByName).map((filterName) => {
      const filter = state.params.filtersByName[filterName];
      switch (filter.type) {
         case 'facet': {
            const facet = state.facetsByHandle[filter.id];
            const algoliaName = facet.algoliaName;
            const facetQueries = filter.selectedOptions.map((optionHandle) => {
               const algoliaValue = facet.optionsByHandle[optionHandle].value;
               return `"${algoliaName}":"${algoliaValue}"`;
            });
            if (facetQueries.length === 1) {
               return facetQueries[0];
            }
            return `(${facetQueries.join(' OR ')})`;
         }
         case 'range': {
            const facet = state.facetsByHandle[filter.id];
            const algoliaName = facet.algoliaName;
            if (filter.min == null) {
               return `"${algoliaName}" <= ${filter.max}`;
            }
            if (filter.max == null) {
               return `"${algoliaName}" >= ${filter.min}`;
            }
            return `"${algoliaName}":${filter.min} TO ${filter.max}`;
         }
         default:
            return assertNever(filter);
      }
   });
   if (state.params.rawFilters) {
      filters.unshift(state.params.rawFilters);
   }
   if (filters.length > 0) {
      return filters.join(' AND ');
   }
   return undefined;
}
