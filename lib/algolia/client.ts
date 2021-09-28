import { assertNever, capitalize, keyBy } from '@lib/utils';
import algoliasearch, { SearchClient, SearchIndex } from 'algoliasearch/lite';
import produce from 'immer';
import kebabCase from 'lodash/kebabCase';
import snakeCase from 'lodash/snakeCase';
import { Facet, FacetOption, SearchResponse, SearchState } from './types';

export class AlgoliaClient {
   private client: SearchClient;
   private index: SearchIndex | undefined;

   constructor(appId: string, apiKey: string) {
      this.client = algoliasearch(appId, apiKey);
   }

   async search<Hit = any>(state: SearchState): Promise<SearchState<Hit>> {
      if (
         this.index == null ||
         this.index.indexName !== state.params.indexName
      ) {
         this.index = this.client.initIndex(state.params.indexName);
      }
      const filters = AlgoliaClient.getAlgoliaFilters(state);
      const response = await this.index.search<Hit>(state.params.query, {
         distinct: 1,
         filters,
         facets: ['*'],
         page: state.params.page - 1,
         hitsPerPage: state.params.limit,
      });
      return AlgoliaClient.applySearchResponse(state, response);
   }

   private static getAlgoliaFilters(state: SearchState): string | undefined {
      const algoliaFilters = state.params.filters.allIds.map((filterId) => {
         const filter = state.params.filters.byId[filterId];
         switch (filter.type) {
            case 'facet': {
               const facet = state.facets.byId[filter.id];
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

   private static applySearchResponse<Hit>(
      state: SearchState<Hit>,
      data: SearchResponse
   ): SearchState<Hit> {
      return produce(state, (draftState) => {
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
