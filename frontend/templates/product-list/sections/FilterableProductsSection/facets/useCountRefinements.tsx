import { useAlgoliaSearch } from 'app/_data/product-list/useAlgoliaSearch';

export function useCountRefinements() {
   const { facets } = useAlgoliaSearch();
   const currentRefinements = facets.filter((f) => f.selectedCount > 0);

   return (attributes: string[]) => {
      return currentRefinements.reduce((acc, item) => {
         if (attributes.includes(item.name)) {
            return acc + item.selectedCount;
         }
         return acc;
      }, 0);
   };
}
