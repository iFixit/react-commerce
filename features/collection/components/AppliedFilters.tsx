import {
   Button,
   Collapse,
   Tag,
   TagCloseButton,
   TagLabel,
   Wrap,
   WrapItem,
} from '@chakra-ui/react';
import { formatFacetName } from '@features/collection/utils';
import {
   AtomicFilter,
   useAtomicFilters,
   useClearFilter,
   useSearchStateContext,
} from '@lib/algolia';
import { assertNever } from '@lib/utils';
import * as React from 'react';

export const AppliedFilters = () => {
   const atomicFilters = useAtomicFilters();
   const clear = useClearFilter();
   const clearAllFilters = React.useCallback(() => {
      clear();
   }, [clear]);
   return (
      <Collapse in={atomicFilters.length > 0} animateOpacity unmountOnExit>
         <Wrap w="full" align="center">
            {atomicFilters.map((filter) => {
               return (
                  <WrapItem key={filter.id}>
                     <FilterTag filter={filter} />
                  </WrapItem>
               );
            })}
            <WrapItem>
               <Button
                  variant="link"
                  size="sm"
                  colorScheme="brand"
                  onClick={clearAllFilters}
               >
                  Clear All
               </Button>
            </WrapItem>
         </Wrap>
      </Collapse>
   );
};

interface FilterTagProps {
   filter: AtomicFilter;
}

const FilterTag = ({ filter }: FilterTagProps) => {
   const state = useSearchStateContext();
   const clear = useClearFilter();
   const valuesById = state.facetValues.byId;

   const value = React.useMemo(() => {
      const facetName = formatFacetName(filter.facetName);
      switch (filter.type) {
         case 'basic': {
            return `${facetName}: ${valuesById[filter.valueId].value}`;
         }
         case 'numeric-comparison': {
            return `${facetName}: ${filter.operator} ${filter.value}`;
         }
         case 'numeric-range': {
            return `${facetName}: ${filter.range.min} - ${filter.range.max}`;
         }
         default:
            return assertNever(filter);
      }
   }, [filter, valuesById]);

   const clearFilter = React.useCallback(() => {
      clear(filter.id);
   }, [clear, filter.id]);

   return (
      <Tag size="md" variant="outline" colorScheme="brand">
         <TagLabel>{value}</TagLabel>
         <TagCloseButton onClick={clearFilter} />
      </Tag>
   );
};
