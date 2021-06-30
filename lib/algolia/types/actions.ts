import type { SearchIndex } from 'algoliasearch';
import { ListFilter, NullablePartial, NumericRange } from './state';

type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;

export type SearchResponse = Awaited<ReturnType<SearchIndex['search']>>;

export enum SearchActionType {
   QueryChanged = 'QUERY_CHANGED',
   FiltersCleared = 'FILTERS_CLEARED',
   SearchResultUpdated = 'SEARCH_RESULT_UPDATED',
   PageChanged = 'PAGE_CHANGED',
   ListFilterItemAdded = 'LIST_FILTER_ITEM_ADDED',
   ListFilterItemSet = 'LIST_FILTER_ITEM_SET',
   ListFilterItemToggled = 'LIST_FILTER_ITEM_TOGGLED',
   ListFilterItemCleared = 'LIST_FILTER_ITEM_CLEARED',
   ListFilterAllItemsCleared = 'LIST_FILTER_ALL_ITEMS_CLEARED',
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

export interface ListFilterItemAddedAction {
   type: SearchActionType.ListFilterItemAdded;
   filterId: string;
   valueId: string;
   filterType: ListFilter['type'];
}

export interface ListFilterItemSetAction {
   type: SearchActionType.ListFilterItemSet;
   filterId: string;
   valueId: string;
   filterType: ListFilter['type'];
}

export interface ListFilterItemToggledAction {
   type: SearchActionType.ListFilterItemToggled;
   filterId: string;
   valueId: string;
   filterType: ListFilter['type'];
}

export interface ListFilterItemClearedAction {
   type: SearchActionType.ListFilterItemCleared;
   filterId: string;
   valueId: string;
}

export interface ListFilterAllItemsClearedAction {
   type: SearchActionType.ListFilterAllItemsCleared;
   filterId: string;
}

export interface RangeFilterSetAction {
   type: SearchActionType.RangeFilterSet;
   filterId: string;
   range: NullablePartial<NumericRange>;
}

export type SearchAction =
   | QueryChangedAction
   | SearchResultUpdatedAction
   | FiltersClearedAction
   | PageChangedAction
   | ListFilterItemAddedAction
   | ListFilterItemSetAction
   | ListFilterItemToggledAction
   | ListFilterItemClearedAction
   | ListFilterAllItemsClearedAction
   | RangeFilterSetAction;
