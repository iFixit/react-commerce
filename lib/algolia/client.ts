import { assertNever, capitalize, keyBy } from '@lib/utils';
import algoliasearch, { SearchClient, SearchIndex } from 'algoliasearch/lite';
import produce from 'immer';
import kebabCase from 'lodash/kebabCase';
import snakeCase from 'lodash/snakeCase';
import * as React from 'react';
import { Facet, FacetOption, SearchContext, SearchResponse } from './types';

export function useAlgoliaClient(appId: string, apiKey: string): AlgoliaClient {
   const clientRef = React.useRef<AlgoliaClient>();

   if (clientRef.current == null) {
      clientRef.current = new AlgoliaClient(appId, apiKey);
   }

   return clientRef.current;
}

export class AlgoliaClient {
   private client: SearchClient;
   private index: SearchIndex | undefined;

   constructor(appId: string, apiKey: string) {
      this.client = algoliasearch(appId, apiKey);
   }

   async search<Hit = any>(
      context: SearchContext
   ): Promise<SearchContext<Hit>> {
      if (
         this.index == null ||
         this.index.indexName !== context.params.indexName
      ) {
         this.index = this.client.initIndex(context.params.indexName);
      }
      const filters = AlgoliaClient.getAlgoliaFilters(context);
      const response = await this.index.search<Hit>(context.params.query, {
         distinct: 1,
         filters,
         facets: ['*'],
         page: context.params.page - 1,
         hitsPerPage: context.params.limit,
      });
      return AlgoliaClient.applySearchResponse(context, response);
   }

   private static getAlgoliaFilters(
      context: SearchContext
   ): string | undefined {
      const algoliaFilters = context.params.filters.allIds.map((filterId) => {
         const filter = context.params.filters.byId[filterId];
         switch (filter.type) {
            case 'facet': {
               const facet = context.facets.byId[filter.id];
               const algoliaName = facet.algoliaName;
               const facetQueries = filter.selectedOptions.map(
                  (optionHandle) => {
                     const algoliaValue =
                        facet.options.byId[optionHandle].value;
                     return `"${algoliaName}":"${algoliaValue}"`;
                  }
               );
               if (facetQueries.length === 1) {
                  return facetQueries[0];
               }
               return `(${facetQueries.join(' OR ')})`;
            }
            case 'range': {
               const facet = context.facets.byId[filter.id];
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
      if (context.params.filters.preset) {
         algoliaFilters.unshift(context.params.filters.preset);
      }
      if (algoliaFilters.length > 0) {
         return algoliaFilters.join(' AND ');
      }
      return undefined;
   }

   private static applySearchResponse<Hit>(
      context: SearchContext<Hit>,
      data: SearchResponse
   ): SearchContext<Hit> {
      return produce(context, (draftState) => {
         draftState.isLoaded = true;
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
               const draftOptionsById =
                  draftState.facets.byId[facetId].options.byId;
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
      });
   }
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
