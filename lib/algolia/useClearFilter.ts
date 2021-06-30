import * as React from 'react';
import { useSearchDispatchContext } from './context';
import { SearchActionType } from './types';

export function useClearFilter() {
   const dispatch = useSearchDispatchContext();

   return React.useCallback(
      (names?: string | string[]) => {
         if (typeof names === 'string') {
            dispatch({
               type: SearchActionType.FiltersCleared,
               filterIds: [names],
            });
         } else {
            dispatch({
               type: SearchActionType.FiltersCleared,
               filterIds: names,
            });
         }
      },
      [dispatch]
   );
}
