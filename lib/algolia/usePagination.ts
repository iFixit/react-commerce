import * as React from 'react';
import { useSearchDispatchContext, useSearchStateContext } from './context';
import { SearchActionType } from './types';

export interface UsePagination {
   page: number;
   numberOfPages?: number;
   isLoaded: boolean;
   setPage: (page: number) => void;
}

export function usePagination(): UsePagination {
   const state = useSearchStateContext();
   const dispatch = useSearchDispatchContext();

   const setPage = React.useCallback(
      (page: number) => {
         dispatch({
            type: SearchActionType.PageChanged,
            page,
         });
      },
      [dispatch]
   );

   const pagination = React.useMemo<UsePagination>(() => {
      return {
         isLoaded: state.isLoaded,
         page: state.params.page,
         numberOfPages: state.numberOfPages,
         setPage,
      };
   }, [setPage, state.isLoaded, state.numberOfPages, state.params.page]);

   return pagination;
}
