import * as React from 'react';
import { useSearchStateContext } from './context';

interface UseHits<Hit = any> {
   isLoaded: boolean;
   isSearching: boolean;
   numberOfHits: number;
   hits: Hit[];
}

export function useHits<Hit = any>(): UseHits<Hit> {
   const state = useSearchStateContext<Hit>();
   const result = React.useMemo<UseHits>(() => {
      return {
         isLoaded: state.isLoaded,
         isSearching: state.isSearching,
         numberOfHits: state.numberOfHits || state.hits.allIds.length,
         hits: state.hits.allIds.map((id) => state.hits.byId[id]),
      };
   }, [
      state.hits.allIds,
      state.hits.byId,
      state.isLoaded,
      state.isSearching,
      state.numberOfHits,
   ]);
   return result;
}
