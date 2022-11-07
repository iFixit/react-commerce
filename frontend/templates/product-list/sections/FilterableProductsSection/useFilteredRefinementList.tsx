import {
   useHits,
   useRefinementList,
   UseRefinementListProps,
} from 'react-instantsearch-hooks-web';

export const DEFAULT_SHOW_MORE_LIMIT = 10;

export function useFilteredRefinementList(props: UseRefinementListProps) {
   const isPriceRange = props.attribute == 'price_range';
   const { items, ...rest } = useRefinementList({ ...props });
   const { results } = useHits();
   const hitsCount = results?.nbHits ?? 0;
   const isAnyRefined = items.some((item) => item.isRefined);
   const filteredItems =
      isAnyRefined || isPriceRange
         ? items
         : items.filter((item) => hitsCount !== item.count);

   return { ...rest, items: filteredItems };
}
