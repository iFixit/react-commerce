import * as React from 'react';
import { useSearchContext } from './context';

interface UseHits<Hit = any> {
   isLoaded: boolean;
   numberOfHits: number;
   hits: Hit[];
}

export function useHits<Hit = any>(): UseHits<Hit> {
   const { state } = useSearchContext<Hit>();
   const result = React.useMemo<UseHits>(() => {
      return {
         isLoaded: state.isLoaded,
         numberOfHits: state.numberOfHits || state.hits.allIds.length,
         hits: state.hits.allIds.map((id) => state.hits.byId[id]),
      };
   }, [state.hits.allIds, state.hits.byId, state.isLoaded, state.numberOfHits]);
   return result;
}
