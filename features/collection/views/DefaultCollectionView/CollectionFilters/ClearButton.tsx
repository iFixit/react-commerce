import { Button, Collapse } from '@chakra-ui/react';
import { useSearchContext } from '@lib/algolia';
import { clearFilter } from '@lib/algolia/utils';
import * as React from 'react';

export interface ClearButtonProps {
   onlyFacetNames?: string | string[];
}

export function ClearButton({
   onlyFacetNames,
   children,
}: React.PropsWithChildren<ClearButtonProps>) {
   const { state, setState } = useSearchContext();

   const isFiltered = React.useMemo(() => {
      if (onlyFacetNames == null) {
         return state.filters.rootIds.length > 0;
      }
      if (typeof onlyFacetNames === 'string') {
         return state.filters.rootIds.includes(onlyFacetNames);
      }
      return state.filters.rootIds.some((rootId) =>
         onlyFacetNames.includes(rootId)
      );
   }, [state.filters.rootIds, onlyFacetNames]);

   const handleClear = React.useCallback(() => {
      setState((state) => {
         if (onlyFacetNames == null) {
            return clearFilter(state);
         }
         if (typeof onlyFacetNames === 'string') {
            return clearFilter(state, [onlyFacetNames]);
         }
         return clearFilter(state, onlyFacetNames);
      });
   }, [setState, onlyFacetNames]);

   return (
      <Collapse in={isFiltered} animateOpacity>
         <Button variant="link" colorScheme="blue" onClick={handleClear}>
            {children}
         </Button>
      </Collapse>
   );
}
