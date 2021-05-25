import { SearchIndex } from 'algoliasearch/lite';

export type AlgoliaProviderProps<Hit = any> = {
   appId: string;
   apiKey: string;
   indexName: string;
   onIndexNameChange?: (indexName: string) => void;
   initialState?: Partial<SearchState<Hit>>;
   state?: SearchState<Hit>;
   onChange?: (state: SearchState<Hit>) => void;
};

export type SearchContext<Hit = any> = {
   state: SearchState<Hit>;
   setState: React.Dispatch<React.SetStateAction<SearchState<Hit>>>;
   index: SearchIndex;
};

export interface SearchState<Hit = any> {
   query: string;
   page: number;
   numberOfPages?: number;
   limit?: number;
   rawFilters?: string;
   isLoaded: boolean;
   numberOfHits?: number;
   hits: Entity<Hit>;
   facets: Entity<FacetState>;
   facetValues: Entity<FacetValueState>;
   filters: FilterEntity;
}

export interface Entity<Type = any> {
   byId: Record<string, Type>;
   allIds: string[];
}

export interface FilterEntity {
   byId: Record<string, Filter>;
   rootIds: string[];
   allIds: string[];
}

export interface FacetState {
   name: string;
   valueIds: string[];
}

export interface FacetValueState {
   id: string;
   facetId: string;
   value: string;
   totalHitCount: number;
   filteredHitCount: number;
}

export type Filter =
   | ListFilter
   | BasicFilter
   | NumericComparisonFilter
   | NumericRangeFilter;

export type ListFilter = OrFilter | AndFilter;

export type OrFilter = {
   id: string;
   type: 'or';
   filterIds: string[];
};

export type AndFilter = {
   id: string;
   type: 'and';
   filterIds: string[];
};

export type BasicFilter = {
   id: string;
   type: 'basic';
   facetId: string;
   valueId: string;
};

export type NumericComparisonFilter = {
   id: string;
   type: 'numeric-comparison';
   facet: string;
   operator: NumericComparisonOperator;
   value: number;
};

export type NumericRangeFilter = {
   id: string;
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
