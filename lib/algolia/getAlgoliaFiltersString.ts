import { assertNever } from '@lib/utils';
import { SearchState } from './types';

export function getAlgoliaFiltersString(state: SearchState) {
   const algoliaFilters = state.params.filters.allIds.map((filterId) => {
      const filter = state.params.filters.byId[filterId];
      switch (filter.type) {
         case 'facet': {
            const facet = state.facets.byId[filter.id];
            const algoliaName = facet.algoliaName;
            const facetQueries = filter.selectedOptions.map((optionHandle) => {
               const algoliaValue = facet.options.byId[optionHandle].value;
               return `"${algoliaName}":"${algoliaValue}"`;
            });
            if (facetQueries.length === 1) {
               return facetQueries[0];
            }
            return `(${facetQueries.join(' OR ')})`;
         }
         case 'range': {
            const facet = state.facets.byId[filter.id];
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
   if (state.params.filters.preset) {
      algoliaFilters.unshift(state.params.filters.preset);
   }
   if (algoliaFilters.length > 0) {
      return algoliaFilters.join(' AND ');
   }
   return undefined;
}
