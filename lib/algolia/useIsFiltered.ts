import { useSearchStateContext } from './context';

export interface UseIsFilteredProps {
   onlyFacetNames?: string | string[];
   includeRawFilters?: boolean;
}

export function useIsFiltered(
   props: UseIsFilteredProps = { includeRawFilters: false }
): boolean {
   const state = useSearchStateContext();
   const { onlyFacetNames, includeRawFilters } = props;

   if (includeRawFilters && state.params.rawFilters != null) {
      return true;
   }
   if (onlyFacetNames == null) {
      return (
         state.params.filters.rootIds.length > 0 ||
         (state.params.query != null && state.params.query.length > 0)
      );
   }
   if (typeof onlyFacetNames === 'string') {
      return state.params.filters.rootIds.includes(onlyFacetNames);
   }
   return state.params.filters.rootIds.some((rootId) =>
      onlyFacetNames.includes(rootId)
   );
}
