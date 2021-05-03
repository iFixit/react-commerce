import * as React from 'react';
import { SearchIndex } from 'algoliasearch/lite';

export type SearchContext<Hit = any> = {
   searchParams: SearchParams;
   searchResult: SearchResult<Hit>;
   refine: React.Dispatch<React.SetStateAction<SearchParams>>;
   index: SearchIndex;
};

export type AlgoliaProviderProps = {
   appId: string;
   apiKey: string;
   /**
    * A virtual filter does not appear on the UI.
    * It is used to enforce constraints (e.g. display only products belonging to a given collection)
    */
   virtualFilter?: Filter;
   defaultIndexName: string;
   defaultHitPerPage?: number;
};

export type SearchParams = {
   indexName: string;
   query: string;
   filters: Filter[];
   page: number;
};

export type SearchResult<Hit = any> = {
   hits: Hit[];
   numberOfHits: number;
   numberOfPages: number;
   isLoaded: boolean;
   facetsByName: FacetsByName;
};

export type Filter =
   | OrFilterClause
   | AndFilterClause
   | BasicFilter
   | NumericComparisonFilter
   | NumericRangeFilter;

export type FilterClause = OrFilterClause | AndFilterClause;

export type OrFilterClause = {
   type: 'or';
   filters: Filter[];
};

export type AndFilterClause = {
   type: 'and';
   filters: Filter[];
};

export type BasicFilter = {
   type: 'basic';
   facet: string;
   value: string;
};

export type NumericComparisonFilter = {
   type: 'numeric-comparison';
   facet: string;
   operator: NumericComparisonOperator;
   value: number;
};

export type NumericRangeFilter = {
   type: 'numeric-range';
   facet: string;
   lowerValue: number;
   higherValue: number;
};

export enum NumericComparisonOperator {
   LessThan = '<',
   LessThanOrEqual = '<=',
   Equal = '=',
   NotEqual = '!=',
   GreaterThanOrEqual = '>=',
   GreaterThan = '>',
}

export type FacetItem = {
   value: string;
   total: number;
   filtered: number;
};

export type FacetItemsByValue = Record<string, FacetItem>;

export type FacetsByName = Record<string, FacetItemsByValue>;
