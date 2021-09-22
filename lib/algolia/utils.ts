import { capitalize } from '@lib/utils';
import produce, { Draft } from 'immer';
import kebabCase from 'lodash/kebabCase';
import keyBy from 'lodash/keyBy';
import snakeCase from 'lodash/snakeCase';
import * as React from 'react';
import { Facet, FacetOption, SearchResponse, SearchState } from './types';

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

export interface CreateInitialStateArgs {
   indexName: string;
   rawFilters?: string;
   limit?: number;
}
export function createInitialState({
   indexName,
   rawFilters,
   limit = 24,
}: CreateInitialStateArgs): SearchState {
   return {
      params: {
         indexName,
         rawFilters,
         query: '',
         page: 1,
         filtersByName: {},
         limit,
      },
      isLoaded: false,
      isSearching: false,
      hits: {
         byId: {},
         allIds: [],
      },
      facetsByHandle: {},
   };
}

export interface CreateSearchStateParams {
   indexName: string;
   rawFilters?: string;
}
export function createSearchState<Hit = any>(
   params: CreateSearchStateParams,
   searchResponse: SearchResponse
): SearchState<Hit> {
   const initialState = createInitialState({
      indexName: params.indexName,
      rawFilters: params.rawFilters,
   });
   const producer = produce(updateSearchStateRecipe);
   const state = producer(initialState, searchResponse);
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
      const facetHandle = snakeCase(facetName);
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
         handle: facetHandle,
         name: facetName,
         optionsByHandle: newOptionsByHandle,
      };
      if (draftState.facetsByHandle[facetHandle] == null) {
         draftState.facetsByHandle[facetHandle] = facet;
      } else {
         const draftOptionsByHandle =
            draftState.facetsByHandle[facetHandle].optionsByHandle;
         newOptions.forEach((option) => {
            if (draftOptionsByHandle[option.handle] == null) {
               draftOptionsByHandle[option.handle] = option;
            } else {
               draftOptionsByHandle[option.handle].filteredHitCount =
                  option.filteredHitCount;
            }
         });
         Object.keys(draftOptionsByHandle).forEach((handle) => {
            if (newOptionsByHandle[handle] == null) {
               draftOptionsByHandle[handle].filteredHitCount = 0;
            }
         });
      }
   });
   Object.keys(draftState.facetsByHandle).forEach((facetHandle) => {
      const draftFacet = draftState.facetsByHandle[facetHandle];
      if (responseFacets[draftFacet.algoliaName] == null) {
         Object.keys(draftFacet.optionsByHandle).forEach((optionHandle) => {
            draftFacet.optionsByHandle[optionHandle].filteredHitCount = 0;
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
