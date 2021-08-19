import * as React from 'react';
import { useSearchDispatchContext } from './context';
import { SearchActionType } from './types';

export function useClearFilter() {
   const dispatch = useSearchDispatchContext();

   return React.useCallback(
      (ids?: string | string[]) => {
         if (typeof ids === 'string') {
            dispatch({
               type: SearchActionType.FiltersCleared,
               filterIds: [ids],
            });
         } else {
            dispatch({
               type: SearchActionType.FiltersCleared,
               filterIds: ids,
            });
         }
      },
      [dispatch]
   );
}
