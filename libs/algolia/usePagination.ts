import * as React from 'react';
import { useSearchContext } from './context';

export function usePagination(): [
   page: number,
   setPage: (page: number) => void
] {
   const context = useSearchContext();

   const setPage = React.useCallback(
      (page: number) => {
         context.refine((current) => {
            return {
               ...current,
               page,
            };
         });
      },
      [context]
   );

   return [context.searchParams.page, setPage];
}
