import {
   PRODUCT_LIST_DEFAULT_FACET_VALUES_COUNT,
   PRODUCT_LIST_MAX_FACET_VALUES_COUNT,
} from '@config/constants';
import { useHits, useRefinementList } from 'react-instantsearch';
import { useSortBy } from './useSortBy';

export type RefinementListFacetState = ReturnType<
   typeof useRefinementListFacet
>;

export type UseRefinementListFacetProps = {
   attribute: string;
};

export function useRefinementListFacet({
   attribute,
}: UseRefinementListFacetProps) {
   const isPriceRange = attribute == 'price_range';
   const { items, ...rest } = useRefinementList({
      attribute,
      sortBy: useSortBy({ attribute }),
      limit: PRODUCT_LIST_DEFAULT_FACET_VALUES_COUNT,
      showMore: true,
      showMoreLimit: PRODUCT_LIST_MAX_FACET_VALUES_COUNT,
   });
   const { results } = useHits();
   const hitsCount = results?.nbHits ?? 0;
   const isAnyRefined = items.some((item) => item.isRefined);
   const filteredItems =
      isAnyRefined || isPriceRange
         ? items
         : items.filter((item) => hitsCount !== item.count);
   const hasApplicableRefinements = filteredItems.length > 0;

   return { ...rest, items: filteredItems, hasApplicableRefinements };
}
