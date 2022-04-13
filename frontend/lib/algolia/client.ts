import { capitalize, keyBy } from '@helpers/application-helpers';
import { assertNever } from '@ifixit/helpers';
import algoliasearch, { SearchIndex } from 'algoliasearch/lite';
import produce from 'immer';
import kebabCase from 'lodash/kebabCase';
import snakeCase from 'lodash/snakeCase';
import * as React from 'react';
import { FilterType } from '.';
import { Facet, FacetOption, SearchContext, SearchResponse } from './types';

export function useAlgoliaClient(appId: string, apiKey: string) {
   const clientRef = React.useRef<ReturnType<typeof createAlgoliaClient>>();

   if (clientRef.current == null) {
      clientRef.current = createAlgoliaClient(appId, apiKey);
   }

   return clientRef.current;
}

export function createAlgoliaClient(appId: string, apiKey: string) {
   const client = algoliasearch(appId, apiKey);
   let index: SearchIndex | undefined;

   return {
      async search<Hit = any>(
         context: SearchContext
      ): Promise<SearchContext<Hit>> {
         if (index == null || index.indexName !== context.params.indexName) {
            index = client.initIndex(context.params.indexName);
         }
         const filters = getAlgoliaFilters(context);
         const response = await index.search<Hit>(context.params.query, {
            distinct: 1,
            filters,
            facets: ['*'],
            page: context.params.page - 1,
            hitsPerPage: context.params.limit,
         });
         return applySearchResponse(context, response);
      },
   };
}

function getAlgoliaFilters(context: SearchContext): string | undefined {
   const algoliaFilters = context.params.filters.allIds.map((filterId) => {
      const filter = context.params.filters.byId[filterId];
      switch (filter.type) {
         case FilterType.List: {
            const facet = context.facets.byId[filter.id];
            const algoliaName = facet.algoliaName;
            const facetQueries = filter.selectedOptions.map((optionHandle) => {
               const algoliaValue = facet.options.byId[optionHandle].value;
               return `${escapeText(algoliaName)}:${escapeText(algoliaValue)}`;
            });
            if (facetQueries.length === 1) {
               return facetQueries[0];
            }
            return `(${facetQueries.join(' OR ')})`;
         }
         case FilterType.Range: {
            const facet = context.facets.byId[filter.id];
            const algoliaName = facet.algoliaName;
            if (filter.min == null) {
               return `${escapeText(algoliaName)} <= ${filter.max}`;
            }
            if (filter.max == null) {
               return `${escapeText(algoliaName)} >= ${filter.min}`;
            }
            return `${escapeText(algoliaName)}:${filter.min} TO ${filter.max}`;
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

function escapeText(text: string) {
   return JSON.stringify(text);
}

function applySearchResponse<Hit>(
   context: SearchContext<Hit>,
   data: SearchResponse
): SearchContext<Hit> {
   return produce(context, (draftState) => {
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

function formatFacetName(algoliaName: string): string {
   let name = algoliaName.replace(/(options\.|facet_tags\.)/gi, '');
   name = name.replace(/_/g, ' ');
   name = capitalize(name);
   return name;
}
