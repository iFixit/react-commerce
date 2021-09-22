import type { SearchIndex } from 'algoliasearch';

type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;

export type SearchResponse = Awaited<ReturnType<SearchIndex['search']>>;

export enum SearchActionType {
   QueryChanged = 'QUERY_CHANGED',
   FiltersCleared = 'FILTERS_CLEARED',
   SearchResultUpdated = 'SEARCH_RESULT_UPDATED',
   PageChanged = 'PAGE_CHANGED',
   FacetFilterOptionAdded = 'FACET_FILTER_OPTION_ADDED',
   FacetFilterOptionSet = 'FACET_FILTER_OPTION_SET',
   FacetFilterOptionToggled = 'FACET_FILTER_OPTION_TOGGLED',
   FacetFilterOptionCleared = 'FACET_FILTER_OPTION_CLEARED',
   FacetFilterAllOptionsCleared = 'FACET_FILTER_ALL_OPTIONS_CLEARED',
   RangeFilterSet = 'RANGE_FILTER_SET',
}

export interface QueryChangedAction {
   type: SearchActionType.QueryChanged;
   query: string;
}

export interface SearchResultUpdatedAction {
   type: SearchActionType.SearchResultUpdated;
   data: SearchResponse;
}

export interface FiltersClearedAction {
   type: SearchActionType.FiltersCleared;
   filterIds?: string[];
}

export interface PageChangedAction {
   type: SearchActionType.PageChanged;
   page: number;
}

export interface FacetFilterOptionAddedAction {
   type: SearchActionType.FacetFilterOptionAdded;
   filterId: string;
   optionHandle: string;
}

export interface FacetFilterOptionSetAction {
   type: SearchActionType.FacetFilterOptionSet;
   filterId: string;
   optionHandle: string;
}

export interface FacetFilterOptionToggledAction {
   type: SearchActionType.FacetFilterOptionToggled;
   filterId: string;
   optionHandle: string;
}

export interface FacetFilterOptionClearedAction {
   type: SearchActionType.FacetFilterOptionCleared;
   filterId: string;
   optionHandle: string;
}

export interface FacetFilterAllOptionsClearedAction {
   type: SearchActionType.FacetFilterAllOptionsCleared;
   filterId: string;
}

export interface RangeFilterSetAction {
   type: SearchActionType.RangeFilterSet;
   filterId: string;
   min?: number;
   max?: number;
}

export type SearchAction =
   | QueryChangedAction
   | SearchResultUpdatedAction
   | FiltersClearedAction
   | PageChangedAction
   | FacetFilterOptionAddedAction
   | FacetFilterOptionSetAction
   | FacetFilterOptionToggledAction
   | FacetFilterOptionClearedAction
   | FacetFilterAllOptionsClearedAction
   | RangeFilterSetAction;
