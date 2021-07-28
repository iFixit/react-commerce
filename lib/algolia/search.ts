import { SearchIndex } from 'algoliasearch/lite';
import produce from 'immer';
import { FacetValueState, SearchState } from './types';
import { filterListNullableItems, generateId, mergeUnique } from './utils';

interface SearchParameters {}

export async function search<Hit>(
   state: SearchState<Hit>,
   index: SearchIndex
): Promise<SearchState<Hit>> {
   const response = await index.search(state.params.query, {
      distinct: 1,
      filters: getFiltersQuery(state),
      facets: ['*'],
      page: state.params.page - 1,
      hitsPerPage: state.params.limit,
   });
   const responseFacets = response.facets || {};
   const newFacetNames = Object.keys(responseFacets);
   return produce(state, (draftState) => {
      draftState.isLoaded = true;
      draftState.numberOfPages = response.nbPages;
      draftState.numberOfHits = response.nbHits;
      draftState.hits.allIds = [];
      response.hits.forEach((hit) => {
         draftState.hits.byId[hit.objectID] = hit as any;
         draftState.hits.allIds.push(hit.objectID);
      });
      // Update facets
      newFacetNames.forEach((facetName) => {
         const newValues = Object.keys(responseFacets[facetName]);
         const newValueStates = newValues.map<FacetValueState>((value) => {
            const id = generateId(facetName, value);
            const count = responseFacets[facetName][value];
            return {
               id,
               facetId: facetName,
               value,
               filteredHitCount: count,
               totalHitCount:
                  state.facetValues.byId[id]?.totalHitCount || count,
            };
         });
         const newValueIds = newValueStates.map((valueState) => valueState.id);
         if (draftState.facets.byId[facetName] == null) {
            draftState.facets.byId[facetName] = {
               name: facetName,
               valueIds: newValueIds,
            };
            draftState.facets.allIds.push(facetName);
         } else {
            draftState.facets.byId[facetName].valueIds = mergeUnique(
               draftState.facets.byId[facetName].valueIds,
               newValueIds
            );
         }
         newValueStates.forEach((newValueState) => {
            draftState.facetValues.byId[newValueState.id] = newValueState;
            if (!draftState.facetValues.allIds.includes(newValueState.id)) {
               draftState.facetValues.allIds.push(newValueState.id);
            }
         });
      });
      draftState.facetValues.allIds.forEach((id) => {
         const facetValue = draftState.facetValues.byId[id];
         if (
            response.facets?.[facetValue.facetId]?.[facetValue.value] == null
         ) {
            facetValue.filteredHitCount = 0;
         }
      });
   });
}

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
