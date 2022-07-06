import {
   useHits,
   useRefinementList,
   UseRefinementListProps,
} from 'react-instantsearch-hooks-web';

export function useFilteredRefinementList(props: UseRefinementListProps) {
   const { items, ...rest } = useRefinementList({ ...props });
   const { results } = useHits();
   const hitsCount = results?.nbHits ?? 0;

   const filteredItems = items.filter(
      (item) => item.isRefined || hitsCount > item.count
   );

   return { ...rest, items: filteredItems };
}
