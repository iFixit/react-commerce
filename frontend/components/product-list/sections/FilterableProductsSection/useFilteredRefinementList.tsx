import {
   useHits,
   useRefinementList,
   UseRefinementListProps,
} from 'react-instantsearch-hooks-web';

export function useFilteredRefinementList(props: UseRefinementListProps) {
   const { items, ...rest } = useRefinementList({ ...props });
   const { results } = useHits();
   const hitsCount = results?.nbHits ?? 0;
   const isAnyRefined = items.some((item) => item.isRefined);

   const filteredItems = isAnyRefined
      ? items
      : items.filter((item) => hitsCount !== item.count);

   return { ...rest, items: filteredItems, isAnyRefined };
}
