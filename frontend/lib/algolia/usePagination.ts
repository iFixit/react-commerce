import * as React from 'react';
import { SearchMachineState } from './search.machine';
import { useSearchServiceContext } from './context';
import { useSelector } from '@lib/fsm-utils';

export interface UsePagination {
   page: number;
   numberOfPages?: number;
   setPage: (page: number) => void;
}

export function usePagination(): UsePagination {
   const service = useSearchServiceContext();
   const page = useSelector(service, pageSelector);
   const numberOfPages = useSelector(service, numberOfPagesSelector);

   const setPage = React.useCallback(
      (page: number) => {
         service.send({
            type: 'SET_PAGE',
            page,
         });
      },
      [service]
   );

   const pagination = React.useMemo<UsePagination>(() => {
      return {
         page,
         numberOfPages,
         setPage,
      };
   }, [numberOfPages, page, setPage]);

   return pagination;
}

function pageSelector(state: SearchMachineState) {
   return state.context.params.page;
}

function numberOfPagesSelector(state: SearchMachineState) {
   return state.context.numberOfPages || 0;
}
