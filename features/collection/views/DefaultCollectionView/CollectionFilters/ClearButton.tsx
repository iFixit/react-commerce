import { Button, Collapse } from '@chakra-ui/react';
import { useClearFilter, useSearchContext } from '@lib/algolia';
import * as React from 'react';

export interface ClearButtonProps {
   onlyFacetNames?: string | string[];
}

export function ClearButton({
   onlyFacetNames,
   children,
}: React.PropsWithChildren<ClearButtonProps>) {
   const { state } = useSearchContext();
   const clear = useClearFilter();

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
      clear(onlyFacetNames);
   }, [clear, onlyFacetNames]);

   return (
      <Collapse in={isFiltered} animateOpacity>
         <Button variant="link" colorScheme="blue" onClick={handleClear}>
            {children}
         </Button>
      </Collapse>
   );
}
