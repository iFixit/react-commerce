import { capitalize } from '@lib/utils';
import produce, { Draft } from 'immer';
import kebabCase from 'lodash/kebabCase';
import keyBy from 'lodash/keyBy';
import snakeCase from 'lodash/snakeCase';
import * as React from 'react';
import {
   Facet,
   FacetOption,
   SearchParams,
   SearchResponse,
   SearchState,
} from './types';

export function useDebounce<Value = any>(value: Value, delay: number): Value {
   const [debouncedValue, setDebouncedValue] = React.useState(value);

   React.useEffect(() => {
      const handler = setTimeout(() => {
         setDebouncedValue(value);
      }, delay);
      return () => {
         clearTimeout(handler);
      };
   }, [value, delay]);

   return debouncedValue;
}

export function createInitialState({
   indexName,
   filters = { byId: {}, allIds: [] },
   limit = 24,
   page = 1,
   query = '',
}: Partial<SearchParams> & { indexName: string }): SearchState {
   return {
      params: {
         indexName,
         filters,
         query,
         page,
         limit,
      },
      isLoaded: false,
      isSearching: false,
      hits: {
         byId: {},
         allIds: [],
      },
      facets: {
         allIds: [],
         byId: {},
      },
   };
}

export function createSearchState<Hit = any>(
   params: Partial<SearchParams> & { indexName: string },
   response?: SearchResponse
): SearchState<Hit> {
   let state = createInitialState(params);
   if (response) {
      const producer = produce(updateSearchStateRecipe);
      state = producer(state, response);
   }
   return state;
}

export function updateSearchStateRecipe(
   draftState: Draft<SearchState>,
   data: SearchResponse
) {
   draftState.isLoaded = true;
   draftState.isSearching = false;
   draftState.numberOfPages = data.nbPages;
   draftState.numberOfHits = data.nbHits;
   draftState.hits.allIds = [];
   data.hits.forEach((hit) => {
      draftState.hits.byId[hit.objectID] = hit as any;
      draftState.hits.allIds.push(hit.objectID);
   });
   // Update facets
   const responseFacets = data.facets || {};
   const newFacetNames = Object.keys(responseFacets);
   newFacetNames.forEach((algoliaFacetName) => {
      const facetName = formatFacetName(algoliaFacetName);
      const facetId = snakeCase(facetName);
      const values = Object.keys(responseFacets[algoliaFacetName]);
      const newOptions = values.map<FacetOption>((value) => {
         const count = responseFacets[algoliaFacetName][value];
         return {
            handle: kebabCase(value),
            value,
            filteredHitCount: count,
            totalHitCount: count,
         };
      });
      const newOptionsByHandle = keyBy(newOptions, 'handle');
      const facet: Facet = {
         algoliaName: algoliaFacetName,
         handle: facetId,
         name: facetName,
         options: {
            allIds: Object.keys(newOptionsByHandle),
            byId: newOptionsByHandle,
         },
      };
      if (draftState.facets.byId[facetId] == null) {
         draftState.facets.allIds.push(facetId);
         draftState.facets.byId[facetId] = facet;
      } else {
         const draftOptionsById = draftState.facets.byId[facetId].options.byId;
         newOptions.forEach((option) => {
            if (draftOptionsById[option.handle] == null) {
               draftOptionsById[option.handle] = option;
            } else {
               draftOptionsById[option.handle].filteredHitCount =
                  option.filteredHitCount;
            }
         });
         Object.keys(draftOptionsById).forEach((handle) => {
            if (newOptionsByHandle[handle] == null) {
               draftOptionsById[handle].filteredHitCount = 0;
            }
         });
      }
   });
   draftState.facets.allIds.forEach((facetHandle) => {
      const draftFacet = draftState.facets.byId[facetHandle];
      if (responseFacets[draftFacet.algoliaName] == null) {
         draftFacet.options.allIds.forEach((optionHandle) => {
            draftFacet.options.byId[optionHandle].filteredHitCount = 0;
         });
      }
   });
}

function formatFacetName(algoliaName: string): string {
   let name = algoliaName;
   if (name.startsWith('options.')) {
      name = name.replace('options.', '');
   }
   if (name.startsWith('named_tags.')) {
      name = name.replace('named_tags.', '');
   }
   name = name.replace(/_/g, ' ');
   name = capitalize(name);
   return name;
}
