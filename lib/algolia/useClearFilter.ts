import * as React from 'react';
import { useSearchServiceContext } from './context';

export function useClearFilter() {
   const service = useSearchServiceContext();

   return React.useCallback(
      (ids?: string | string[]) => {
         service.send({
            type: 'CLEAR_FILTERS',
            filterIds: typeof ids === 'string' ? [ids] : ids,
         });
      },
      [service]
   );
}
