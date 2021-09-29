import { Radio, Text, VStack } from '@chakra-ui/react';
import { Facet, FacetOption, useFacetFilter } from '@lib/algolia';
import * as React from 'react';
import { FilterCheckbox } from '../FilterCheckbox';
import { useRangeFilterContext, useRegisterFacet } from './context';

export type RangeFilterListProps = {
   facet: Facet;
   multiple?: boolean;
   sortItems?(a: FacetOption, b: FacetOption): number;
   renderItem?(item: RangeItem): React.ReactNode;
};

interface RangeItem extends FacetOption {
   isRangeStart: boolean;
   isRangeEnd: boolean;
}

export function RangeFilterList({
   facet,
   multiple = false,
   renderItem,
   sortItems = defaultSortItems,
}: RangeFilterListProps) {
   const { getFacetHandles } = useRangeFilterContext();
   const { selectedOptions, toggle, set } = useFacetFilter(facet.handle);
   useRegisterFacet(facet.handle);

   const facetOptions = React.useMemo<RangeItem[]>(() => {
      return facet.options.allIds
         .slice()
         .sort((aId, bId) =>
            sortItems(facet.options.byId[aId], facet.options.byId[bId])
         )
         .map<RangeItem>((id, index) => {
            return {
               ...facet.options.byId[id],
               isRangeStart: index === 0,
               isRangeEnd: index === facet.options.allIds.length - 1,
            };
         });
   }, [facet.options.allIds, facet.options.byId, sortItems]);

   const filteredOptions = React.useMemo(() => {
      return facetOptions.filter((option) => option.filteredHitCount > 0);
   }, [facetOptions]);

   const handleChange = React.useCallback(
      (name: string) => {
         const facetNames = getFacetHandles();
         const facetToBeCleared = facetNames.filter(
            (name) => name !== facet.handle
         );
         toggle(name, { clearFacets: facetToBeCleared });
      },
      [facet.handle, getFacetHandles, toggle]
   );

   return (
      <VStack align="flex-start">
         {filteredOptions.map((option) => {
            if (multiple) {
               return (
                  <FilterCheckbox
                     key={option.handle}
                     name={option.handle}
                     isChecked={selectedOptions.includes(option.handle)}
                     onChange={handleChange}
                  >
                     {renderItem ? renderItem(option) : option.value}
                  </FilterCheckbox>
               );
            }
            return (
               <Radio
                  key={option.handle}
                  value={option.handle}
                  isChecked={selectedOptions.includes(option.handle)}
                  onChange={() => {
                     const facetNames = getFacetHandles();
                     const facetToBeCleared = facetNames.filter(
                        (name) => name !== facet.handle
                     );
                     set(option.handle, { clearFacets: facetToBeCleared });
                  }}
               >
                  <Text fontSize="sm">
                     {renderItem ? renderItem(option) : option.value}
                  </Text>
               </Radio>
            );
         })}
      </VStack>
   );
}

function defaultSortItems(a: FacetOption, b: FacetOption): number {
   return a.value.localeCompare(b.value);
}
