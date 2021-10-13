import * as React from 'react';
import { useSearchServiceContext } from './context';

export function useClearSearchParams() {
   const service = useSearchServiceContext();

   return React.useCallback(() => {
      service.send({
         type: 'CLEAR_SEARCH_PARAMS',
      });
   }, [service]);
}
