export type Maybe<T> = T | null;

export type NullablePartial<T> = { [P in keyof T]?: T[P] | undefined | null };

// Search state

export interface SearchState<Hit = any> {
   params: SearchParams;
   numberOfPages?: number;
   isLoaded: boolean;
   numberOfHits?: number;
   hits: Entity<Hit>;
   facets: Entity<FacetState>;
   facetValues: Entity<FacetValueState>;
}

export interface SearchParams {
   indexName: string;
   query: string;
   page: number;
   limit?: number;
   rawFilters?: string;
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

// Filter types

export type Filter = ListFilter | AtomicFilter;

export type ListFilter = OrFilter | AndFilter;

export type AtomicFilter =
   | BasicFilter
   | NumericComparisonFilter
   | NumericRangeFilter;

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
   range: NumericRange;
};

export interface NumericRange {
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
