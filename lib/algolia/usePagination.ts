import produce from 'immer';
import * as React from 'react';
import { useSearchContext } from './context';

export interface UsePagination {
   page: number;
   numberOfPages?: number;
   isLoaded: boolean;
   setPage: (page: number) => void;
}

export function usePagination(): UsePagination {
   const { state, setState } = useSearchContext();

   const setPage = React.useCallback(
      (page: number) => {
         setState(
            produce((draftState) => {
               draftState.page = page;
            })
         );
      },
      [setState]
   );

   const pagination = React.useMemo<UsePagination>(() => {
      return {
         isLoaded: state.isLoaded,
         page: state.page,
         numberOfPages: state.numberOfPages,
         setPage,
      };
   }, [setPage, state.isLoaded, state.numberOfPages, state.page]);

   return pagination;
}
