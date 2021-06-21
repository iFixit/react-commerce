import { SearchIndex } from 'algoliasearch/lite';

export type Maybe<T> = T | null;

export type NullablePartial<T> = { [P in keyof T]?: T[P] | undefined | null };

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
   filters: Entity<Filter, { rootIds: string[] }>;
}

type ObjectLiteral = { [key: string]: any };

export type Entity<Type = any, Extension = ObjectLiteral> = {
   byId: Record<string, Type>;
   allIds: string[];
} & Extension;

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
   parentId?: string;
   type: 'or';
   filterIds: string[];
};

export type AndFilter = {
   id: string;
   parentId?: string;
   type: 'and';
   filterIds: string[];
};

export type BasicFilter = {
   id: string;
   parentId?: string;
   type: 'basic';
   facetName: string;
   valueId: string;
};

export type NumericComparisonFilter = {
   id: string;
   parentId?: string;
   type: 'numeric-comparison';
   facetName: string;
   operator: NumericComparisonOperator;
   value: number;
};

export type NumericRangeFilter = {
   id: string;
   parentId?: string;
   type: 'numeric-range';
   facetName: string;
   range: Range;
};

export interface Range {
   min: number;
   max: number;
}

export enum NumericComparisonOperator {
   LessThan = '<',
   LessThanOrEqual = '<=',
   Equal = '=',
   NotEqual = '!=',
   GreaterThanOrEqual = '>=',
   GreaterThan = '>',
}
