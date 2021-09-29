import { Radio, Text, VStack } from '@chakra-ui/react';
import { FacetOption, useFacetFilter, useFacet } from '@lib/algolia';
import * as React from 'react';
import { FilterCheckbox } from '../FilterCheckbox';
import { useRangeFilterContext, useRegisterFacet } from './context';

export type RangeFilterListProps = {
   facetHandle: string;
   multiple?: boolean;
   sortItems?(a: FacetOption, b: FacetOption): number;
   renderItem?(item: RangeItem): React.ReactNode;
};

interface RangeItem extends FacetOption {
   isRangeStart: boolean;
   isRangeEnd: boolean;
}

export function RangeFilterList({
   facetHandle,
   multiple = false,
   renderItem,
   sortItems = defaultSortItems,
}: RangeFilterListProps) {
   const { getFacetHandles } = useRangeFilterContext();
   const facet = useFacet(facetHandle);
   const { selectedOptions, toggle, set } = useFacetFilter(facetHandle);
   useRegisterFacet(facetHandle);

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
            (name) => name !== facetHandle
         );
         toggle(name, { clearFacets: facetToBeCleared });
      },
      [facetHandle, getFacetHandles, toggle]
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
                        (name) => name !== facetHandle
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
