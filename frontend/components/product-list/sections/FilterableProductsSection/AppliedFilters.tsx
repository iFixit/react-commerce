import {
   Button,
   chakra,
   Collapse,
   Tag,
   TagCloseButton,
   TagLabel,
   useBreakpointValue,
   Wrap,
   WrapItem,
} from '@chakra-ui/react';
import {
   RangeFilter,
   useClearFilter,
   useFacet,
   useFacetFilter,
   useFilters,
} from '@lib/algolia';
import { assertNever } from '@helpers/application-helpers';
import * as React from 'react';

interface AppliedFiltersProps {
   className?: string;
}

export const AppliedFilters = chakra(({ className }: AppliedFiltersProps) => {
   const filters = useFilters();
   const clear = useClearFilter();
   const clearAllFilters = React.useCallback(() => {
      clear();
   }, [clear]);
   const buttonSize = useBreakpointValue({ base: 'lg', md: 'sm' });

   return (
      <Collapse in={filters.length > 0} animateOpacity unmountOnExit>
         <Wrap className={className} w="full" align="center">
            {filters.map((filter) => {
               switch (filter.type) {
                  case 'facet': {
                     return (
                        <FacetTags key={filter.id} facetHandle={filter.id} />
                     );
                  }
                  case 'range': {
                     return <RangeTag key={filter.id} filter={filter} />;
                  }
                  default:
                     return assertNever(filter);
               }
            })}
            <WrapItem>
               <Button
                  variant="link"
                  size={buttonSize}
                  colorScheme="brand"
                  onClick={clearAllFilters}
               >
                  Clear All
               </Button>
            </WrapItem>
         </Wrap>
      </Collapse>
   );
});

interface FacetTagsProps {
   facetHandle: string;
}

function FacetTags({ facetHandle }: FacetTagsProps) {
   const filter = useFacetFilter(facetHandle);
   const facet = useFacet(facetHandle);

   return (
      <>
         {filter.selectedOptions.map((optionId) => {
            return (
               <WrapItem key={optionId}>
                  <FilterTag onClear={() => filter.clear(optionId)}>
                     {facet.name}: {facet.options.byId[optionId].value}
                  </FilterTag>
               </WrapItem>
            );
         })}
      </>
   );
}

interface RangeTagProps {
   filter: RangeFilter;
}

function RangeTag({ filter }: RangeTagProps) {
   const facet = useFacet(filter.id);
   const clear = useClearFilter();

   let tag: string;
   if (filter.min == null) {
      tag = `${facet.name} <= ${filter.max}`;
   } else if (filter.max == null) {
      tag = `${facet.name} >= ${filter.min}`;
   } else {
      tag = `${facet.name}: ${filter.min} - ${filter.max}`;
   }
   return (
      <WrapItem key={filter.id}>
         <FilterTag onClear={() => clear(filter.id)}>{tag}</FilterTag>
      </WrapItem>
   );
}

type FilterTagProps = React.PropsWithChildren<{
   onClear(): void;
}>;

const FilterTag = ({ children, onClear }: FilterTagProps) => {
   const tagSize = useBreakpointValue({ base: 'lg', md: 'md' });

   return (
      <Tag size={tagSize} variant="outline" colorScheme="brand">
         <TagLabel maxW="260px">{children}</TagLabel>
         <TagCloseButton onClick={onClear} />
      </Tag>
   );
};
