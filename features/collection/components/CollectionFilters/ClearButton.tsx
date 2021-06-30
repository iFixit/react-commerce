import { Button, Collapse } from '@chakra-ui/react';
import { useClearFilter, useIsFiltered } from '@lib/algolia';
import * as React from 'react';

export interface ClearButtonProps {
   onlyFacetNames?: string | string[];
}

export function ClearButton({
   onlyFacetNames,
   children,
}: React.PropsWithChildren<ClearButtonProps>) {
   const clear = useClearFilter();
   const isFiltered = useIsFiltered({
      onlyFacetNames,
   });

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
