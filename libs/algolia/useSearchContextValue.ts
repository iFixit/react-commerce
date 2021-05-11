/* eslint-disable @typescript-eslint/no-use-before-define */
import { SearchIndex } from 'algoliasearch/lite';
import * as React from 'react';
import {
   AlgoliaProviderProps,
   FacetItemsByValue,
   FacetsByName,
   Filter,
   SearchContext,
   SearchParams,
   SearchResult,
} from './types';
import { getFiltersString, useAlgoliaClient, useAlgoliaIndex } from './utils';

export function useSearchContextValue(
   props: AlgoliaProviderProps
): SearchContext {
   const { appId, apiKey, defaultIndexName } = props;
   const client = useAlgoliaClient(appId, apiKey);

   const [searchParams, refine] = React.useState<SearchParams>({
      indexName: defaultIndexName,
      query: '',
      page: 1,
      filters: [],
   });

   const index = useAlgoliaIndex(searchParams.indexName, client);

   const searchResult = useSearchResult(searchParams, index, props);

   const value: SearchContext = {
      searchParams,
      searchResult,
      refine,
      index,
   };

   return value;
}

function useSearchResult(
   searchParams: SearchParams,
   index: SearchIndex,
   props: AlgoliaProviderProps
): SearchResult {
   const { virtualFilter, defaultHitPerPage } = props;
   const [searchResult, setSearchResult] = React.useState<SearchResult>({
      hits: [],
      isLoaded: false,
      numberOfHits: 0,
      numberOfPages: 0,
      facetsByName: {},
   });

   React.useEffect(() => {
      let filtersQuery: string | undefined;
      let filters: Filter[] = [];
      if (virtualFilter) {
         filters.push(virtualFilter);
      }
      if (searchParams.filters.length > 0) {
         filters = filters.concat(searchParams.filters);
      }
      if (filters.length > 0) {
         filtersQuery = getFiltersString(filters);
      }
      index
         .search(searchParams.query, {
            distinct: 1,
            filters: filtersQuery,
            facets: ['*'],
            facetingAfterDistinct: true,
            page: searchParams.page - 1,
            hitsPerPage: defaultHitPerPage,
         })
         .then((result) => {
            setSearchResult((current) => {
               const facetsByName = result.facets
                  ? updateFacetsByName(current.facetsByName, result.facets)
                  : current.facetsByName;
               return {
                  hits: result.hits,
                  numberOfHits: result.nbHits,
                  numberOfPages: result.nbPages,
                  isLoaded: true,
                  facetsByName,
               };
            });
         })
         .catch((error) => {
            console.log('Ops, an error happened during search', error);
         });
   }, [searchParams, index, virtualFilter, defaultHitPerPage]);

   return searchResult;
}

function updateFacetsByName(
   currentFacetsByName: FacetsByName,
   newFacets: Record<string, Record<string, number>>
): FacetsByName {
   const currentFacetNames = Object.keys(currentFacetsByName);
   const newFacetNames = Object.keys(newFacets);
   const facetNames = union(currentFacetNames, newFacetNames);
   return facetNames.reduce((byName, name) => {
      byName[name] = updateFacet(currentFacetsByName[name], newFacets[name]);
      return byName;
   }, {} as FacetsByName);
}

function updateFacet(
   currentFacetItemsByValue: FacetItemsByValue = {},
   newFacetItemCountByValue: Record<string, number> = {}
): FacetItemsByValue {
   const currentItemValues = Object.keys(currentFacetItemsByValue);
   const newItemValues = Object.keys(newFacetItemCountByValue);
   const itemValues = union(currentItemValues, newItemValues);
   return itemValues.reduce((byItemValue, itemValue) => {
      if (newFacetItemCountByValue[itemValue] == null) {
         byItemValue[itemValue] = {
            ...currentFacetItemsByValue[itemValue],
            filtered: 0,
         };
      } else {
         byItemValue[itemValue] = {
            ...byItemValue[itemValue],
            value: itemValue,
            total:
               currentFacetItemsByValue[itemValue]?.total ||
               newFacetItemCountByValue[itemValue],
            filtered: newFacetItemCountByValue[itemValue],
         };
      }
      return byItemValue;
   }, {} as FacetItemsByValue);
}

function union(...arrays: string[][]) {
   const set: Record<string, null> = {};
   for (let i = 0; i < arrays.length; i++) {
      for (let j = 0; j < arrays[i].length; j++) {
         set[arrays[i][j]] = null;
      }
   }
   return Object.keys(set);
}
