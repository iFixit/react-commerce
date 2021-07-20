import { Box, Divider, HStack, keyframes } from '@chakra-ui/react';
import { formatFacetName } from '@features/collection/utils';
import { Facet, FacetValueState } from '@lib/algolia';
import React from 'react';
import { areEqual } from 'react-window';
import { ListFilter } from './ListFilter';
import { useMeasureContent } from './MeasuredContent';
import { RangeFilter, RangeFilterInput, RangeFilterList } from './RangeFilter';

export interface ListItemData {
   facets: Facet[];
   expandedFacets: string[];
   toggleFacet(name: string): void;
}

export interface FilterRowProps {
   data: ListItemData;
   index: number;
   style: any;
}

export const FilterRow = React.memo(
   ({ data, index, style }: FilterRowProps) => {
      const { facets, expandedFacets, toggleFacet } = data;
      const facet = facets[index];
      const isExpanded = expandedFacets.includes(facet.name);
      const filteredValuesCount = facet.values.filter(
         (val) => val.filteredHitCount > 0
      ).length;
      const { ref } = useMeasureContent<HTMLDivElement>(index, [
         isExpanded,
         filteredValuesCount,
      ]);
      const name = formatFacetName(facet.name);

      const onToggle = React.useCallback(() => {
         toggleFacet(facet.name);
      }, [facet.name, toggleFacet]);

      return (
         <Box
            style={style}
            overflow="hidden"
            px="6"
            transition="top 300ms ease-in-out"
         >
            <Box ref={ref}>
               <Box>
                  <HStack
                     as="button"
                     fontWeight="semibold"
                     onClick={onToggle}
                     py="2"
                     w="full"
                     bg="white"
                     transition="background-color 300ms"
                     _hover={{
                        bg: 'gray.50',
                     }}
                  >
                     <Box flex="1" textAlign="left">
                        {name}
                     </Box>
                     <Box
                        px="2"
                        color="gray.500"
                        style={{
                           transform: `rotate(${isExpanded ? '45' : '0'}deg)`,
                           transition: 'transform 300ms',
                        }}
                     >
                        +
                     </Box>
                  </HStack>
                  <Divider />
               </Box>
               {isExpanded && (
                  <Box pt="2" pb="4" pos="relative">
                     {facet.name === 'price_range' ? (
                        <>
                           <RangeFilter>
                              <RangeFilterList
                                 facetName={facet.name}
                                 multiple
                                 sortItems={sortByPriceRange}
                                 renderItem={(item, index, list) => {
                                    const [min, max] = parseRange(item.value);
                                    if (index === 0) {
                                       return `Under $${max}`;
                                    }
                                    if (index === list.length - 1) {
                                       return `$${min} +`;
                                    }
                                    return `$${min} - $${max}`;
                                 }}
                              />
                              <RangeFilterInput
                                 facetName="price"
                                 minFieldPrefix="$"
                                 minFieldPlaceholder="Min"
                                 maxFieldPrefix="$"
                                 maxFieldPlaceholder="Max"
                              />
                           </RangeFilter>
                        </>
                     ) : (
                        <>
                           <ListFilter
                              key={facet.name}
                              facetName={facet.name}
                              multiple
                           />
                        </>
                     )}
                     <Box
                        bg="white"
                        pos="absolute"
                        height="full"
                        w="full"
                        bottom="0"
                        h="0"
                        animation={`${slide} 300ms ease-in`}
                     />
                  </Box>
               )}
            </Box>
         </Box>
      );
   },
   areEqual
);

const slide = keyframes`
  from {
    height: 100%;
  }
  to {
    height: 0;
  }
`;

function parseRange(value: string): [number, number] {
   const [min, max] = value.split(':');
   return [parseFloat(min), parseFloat(max)];
}

function sortByPriceRange(a: FacetValueState, b: FacetValueState): number {
   const [aMin] = parseRange(a.value);
   const [bMin] = parseRange(b.value);
   return aMin - bMin;
}
