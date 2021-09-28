import { ObjectLiteral } from '@lib/utils';

export interface SearchState<Hit = any> {
   params: SearchParams;
   numberOfPages?: number;
   isLoaded: boolean;
   isSearching: boolean;
   numberOfHits?: number;
   hits: Entity<Hit>;
   facets: Entity<Facet>;
}

export interface SearchParams {
   indexName: string;
   query: string;
   page: number;
   limit?: number;
   filters: Entity<Filter> & {
      preset?: string;
   };
}

export type Entity<Type = any, Extension = ObjectLiteral> = {
   byId: Record<string, Type>;
   allIds: string[];
} & Extension;

export interface Facet {
   handle: string;
   name: string;
   algoliaName: string;
   options: Entity<FacetOption>;
}

export interface FacetOption {
   handle: string;
   value: string;
   totalHitCount: number;
   filteredHitCount: number;
}

export type Filter = FacetFilter | RangeFilter;

interface AbstractFilter {
   id: string;
}

export interface FacetFilter extends AbstractFilter {
   type: 'facet';
   selectedOptions: string[];
}

export interface RangeFilter extends AbstractFilter {
   type: 'range';
   min?: number;
   max?: number;
}
