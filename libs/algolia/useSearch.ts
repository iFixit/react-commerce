/* eslint-disable @typescript-eslint/no-use-before-define */
import * as React from 'react';
import { useSearchContext } from './context';

export function useSearch(): [
   query: string,
   search: (newSearch: string) => void
] {
   const context = useSearchContext();

   const search = React.useCallback(
      (newSearch: string) => {
         context.refine((current) => {
            return {
               ...current,
               query: newSearch,
            };
         });
      },
      [context]
   );

   return [context.searchParams.query, search];
}
