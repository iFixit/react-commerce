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

   let filteredItems = isAnyRefined
      ? items
      : items.filter((item) => hitsCount !== item.count);

   let emptyFacetState = false;

   if (filteredItems.length == 0) {
      filteredItems = items.filter((item) => hitsCount === item.count);
      if (filteredItems.length > 0) {
         emptyFacetState = true;
      }
   }
   return { ...rest, items: filteredItems, isEmptyFacetState: emptyFacetState };
}
