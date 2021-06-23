import * as React from 'react';
import { useSearchContext } from './context';
import { clearFilter } from './utils';

export function useClearFilter() {
   const { setState } = useSearchContext();

   return React.useCallback(
      (names?: string | string[]) => {
         setState((state) => {
            if (names == null) {
               return clearFilter(state);
            }
            if (typeof names === 'string') {
               return clearFilter(state, [names]);
            }
            return clearFilter(state, names);
         });
      },
      [setState]
   );
}
