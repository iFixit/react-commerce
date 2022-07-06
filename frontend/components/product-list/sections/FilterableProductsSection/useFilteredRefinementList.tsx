import {
   useHits,
   useRefinementList,
   UseRefinementListProps,
} from 'react-instantsearch-hooks-web';

export function useFilteredRefinementList(props: UseRefinementListProps) {
   const { items, ...rest } = useRefinementList({ ...props });
   const { results } = useHits();
   const hitsCount = results?.nbHits ?? 0;

   const filteredItems = items.reduce((acc: typeof items, item) => {
      if (item.isRefined || hitsCount > item.count) {
         acc.push(item);
      }
      return acc;
   }, []);

   return { ...rest, items: filteredItems };
}
