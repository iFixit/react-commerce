import { useSearchContext } from './context';

export function useSearchResult<Hit = any>() {
   const context = useSearchContext<Hit>();
   return context.searchResult;
}
