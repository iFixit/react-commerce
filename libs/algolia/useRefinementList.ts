/* eslint-disable @typescript-eslint/no-use-before-define */
/**
 * useRefinementList implements a refinement list on a facet. The refinement list can be
 * both conjunctive (AND) or disjunctive (OR).
 * Under the hood the filter is managed as a FilterClause that represents the expression
 * of multiple basic filters combined (according to refinementType prop).
 */
import * as React from 'react';
import { useSearchContext } from './context';
import { BasicFilter, FilterClause, Filter } from './types';

export type UseRefinementListOptions = {
   refinementType?: FilterClause['type'];
};

export type UseRefinementList = {
   items: RefinementListItem[];
   currentRefinements: string[];
   isLoaded: boolean;
   add: (value: string) => void;
   set: (value: string) => void;
   toggle: (value: string) => void;
   clear: (value?: string) => void;
};

export type RefinementListItem = {
   value: string;
   totalCount: number;
   applicableCount: number;
};

export function useRefinementList(
   facet: string,
   { refinementType = 'or' }: UseRefinementListOptions = {}
): UseRefinementList {
   const {
      refine: contextRefine,
      searchParams: { filters },
      searchResult: { facetsByName, isLoaded },
   } = useSearchContext();

   const currentRefinements = React.useMemo(() => {
      return getFacetRefinements(facet, filters);
   }, [facet, filters]);

   const items = React.useMemo<RefinementListItem[]>(() => {
      const facetItemsByValue = facetsByName[facet];
      if (facetItemsByValue) {
         const values = Object.keys(facetItemsByValue);
         return values.map((value) => {
            return {
               value,
               totalCount: facetItemsByValue[value].total,
               applicableCount: facetItemsByValue[value].filtered,
            };
         });
      }
      return [];
   }, [facetsByName, facet]);

   const add = React.useCallback(
      (value: string) => {
         contextRefine((current) => {
            const currRefinements = getFacetRefinements(facet, current.filters);
            if (!currRefinements.includes(value)) {
               return {
                  ...current,
                  filters: addRefinement(
                     current.filters,
                     refinementType,
                     facet,
                     value
                  ),
               };
            }
            return current;
         });
      },
      [contextRefine, facet, refinementType]
   );

   const set = React.useCallback(
      (value: string) => {
         contextRefine((current) => {
            // ..
            return {
               ...current,
               filters: setRefinement(
                  current.filters,
                  refinementType,
                  facet,
                  value
               ),
            };
         });
      },
      [contextRefine, facet, refinementType]
   );

   const toggle = React.useCallback(
      (value: string) => {
         contextRefine((current) => {
            return {
               ...current,
               filters: toggleRefinement(
                  current.filters,
                  refinementType,
                  facet,
                  value
               ),
            };
         });
      },
      [contextRefine, facet, refinementType]
   );

   const clear = React.useCallback(
      (value?: string) => {
         contextRefine((current) => {
            return {
               ...current,
               filters: clearRefinement(current.filters, facet, value),
            };
         });
      },
      [facet, contextRefine]
   );

   return {
      items,
      currentRefinements,
      isLoaded: isLoaded,
      add,
      set,
      toggle,
      clear,
   };
}

export function getFacetRefinements(
   facet: string,
   filters: Filter[]
): string[] {
   const filterClauseIndex = getFacetFilterClauseIndex(filters, facet);
   if (filterClauseIndex >= 0) {
      const filter = getFilterClauseAtIndex(filters, filterClauseIndex);
      return filter.filters.map((filter) => (filter as BasicFilter).value);
   }
   return [];
}

function toggleRefinement(
   filters: Filter[],
   filterType: FilterClause['type'],
   facet: string,
   value: string
): Filter[] {
   const refinements = getFacetRefinements(facet, filters);
   if (refinements.includes(value)) {
      return clearRefinement(filters, facet, value);
   }
   return addRefinement(filters, filterType, facet, value);
}

/**
 * This utility adds a refinement to the provided facet, according to the passed filterType.
 * @param filters The current list of filters
 * @param filterType The filter type (aka FilterClause type)
 * @param facet The facet the filter applies to
 * @param value The value of the refinement
 */
function addRefinement(
   filters: Filter[],
   filterType: FilterClause['type'],
   facet: string,
   value: string
): Filter[] {
   const filterClauseIndex = getFacetFilterClauseIndex(filters, facet);
   if (filterClauseIndex >= 0) {
      const filterClause = getFilterClauseAtIndex(filters, filterClauseIndex);
      return filters
         .slice(0, filterClauseIndex)
         .concat([
            {
               type: filterType,
               filters: filterClause.filters.concat([
                  {
                     type: 'basic',
                     facet: facet,
                     value,
                  },
               ]),
            },
         ])
         .concat(filters.slice(filterClauseIndex + 1, filters.length));
   } else {
      const newFilter: FilterClause = {
         type: filterType,
         filters: [
            {
               type: 'basic',
               facet: facet,
               value,
            },
         ],
      };
      return filters.concat([newFilter]);
   }
}

/**
 * This utility adds a refinement to the provided facet, according to the passed filterType.
 * @param filters The current list of filters
 * @param filterType The filter type (aka FilterClause type)
 * @param facet The facet the filter applies to
 * @param value The value of the refinement
 */
function setRefinement(
   filters: Filter[],
   filterType: FilterClause['type'],
   facet: string,
   value: string
): Filter[] {
   const filterClauseIndex = getFacetFilterClauseIndex(filters, facet);
   if (filterClauseIndex >= 0) {
      return filters
         .slice(0, filterClauseIndex)
         .concat([
            {
               type: filterType,
               filters: [
                  {
                     type: 'basic',
                     facet: facet,
                     value,
                  },
               ],
            },
         ])
         .concat(filters.slice(filterClauseIndex + 1, filters.length));
   } else {
      const newFilter: FilterClause = {
         type: filterType,
         filters: [
            {
               type: 'basic',
               facet: facet,
               value,
            },
         ],
      };
      return filters.concat([newFilter]);
   }
}

/**
 * This utility clears the facet filter on the specified value. If value is undefined, all facet filters are removed.
 * @param filters The current list of filters
 * @param facet The facet that the refine is applied to
 * @param value The value which refinement has to be removed. If no value is provided, all facet filters are cleared
 */
function clearRefinement(
   filters: Filter[],
   facet: string,
   value?: string
): Filter[] {
   const filterClauseIndex = getFacetFilterClauseIndex(filters, facet);
   if (filterClauseIndex >= 0) {
      const filterClause = getFilterClauseAtIndex(filters, filterClauseIndex);
      if (value == null) {
         return filters.filter((filter, index) => index !== filterClauseIndex);
      }
      const facetValueIndex = getFacetValueIndex(
         filterClause.filters,
         facet,
         value
      );
      if (facetValueIndex >= 0) {
         if (filterClause.filters.length > 1) {
            return filters
               .slice(0, filterClauseIndex)
               .concat([
                  {
                     ...filterClause,
                     filters: filterClause.filters.filter(
                        (filter, index) => index !== facetValueIndex
                     ),
                  },
               ])
               .concat(filters.slice(filterClauseIndex + 1, filters.length));
         }
         return filters.filter((filter, index) => index !== filterClauseIndex);
      }
      return filters;
   }
   return filters;
}

/**
 * This utility assumes that filter at index is a FilterClause. This is mainly
 * useful to get correct TS typings and should be used in combination with `getFacetFilterClauseIndex`
 * @param filters A list of filters
 * @param index The index of the clause
 */
function getFilterClauseAtIndex(
   filters: Filter[],
   index: number
): FilterClause {
   return filters[index] as FilterClause;
}

function getFacetFilterClauseIndex(filters: Filter[], facet: string): number {
   return filters.findIndex((filter) => isFacetFilter(facet, filter));
}

function getFacetValueIndex(
   filters: Filter[],
   facet: string,
   value: string
): number {
   return filters.findIndex(
      (filter) =>
         filter.type === 'basic' &&
         filter.facet === facet &&
         filter.value === value
   );
}

function isFacetFilter(facet: string, filter: Filter) {
   switch (filter.type) {
      case 'or':
      case 'and': {
         return (
            filter.filters.length > 0 &&
            filter.filters.every(
               (filter) => filter.type === 'basic' && filter.facet === facet
            )
         );
      }
      default: {
         return false;
      }
   }
}
