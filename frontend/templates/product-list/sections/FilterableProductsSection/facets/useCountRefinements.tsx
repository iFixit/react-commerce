import { useCurrentRefinements } from 'react-instantsearch';

export function useCountRefinements() {
   const currentRefinements = useCurrentRefinements();
   return (attributes: string[]) => {
      return currentRefinements.items.reduce((acc, item) => {
         if (attributes.includes(item.attribute)) {
            return acc + item.refinements.length;
         }
         return acc;
      }, 0);
   };
}
