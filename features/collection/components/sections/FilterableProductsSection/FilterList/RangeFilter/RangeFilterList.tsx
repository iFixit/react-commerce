import { Radio, Text, VStack } from '@chakra-ui/react';
import { FacetOption, useFacetFilter, useFacet } from '@lib/algolia';
import * as React from 'react';
import { FilterCheckbox } from '../FilterCheckbox';
import { useRangeFilterContext, useRegisterFacet } from './context';

export type RangeFilterListProps = {
   facetHandle: string;
   multiple?: boolean;
   sortItems?(a: FacetOption, b: FacetOption): number;
   renderItem?(
      item: FacetOption,
      index: number,
      list: FacetOption[]
   ): React.ReactNode;
};

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

   const facetOptions = React.useMemo(() => {
      return facet.options.allIds.map((id) => facet.options.byId[id]);
   }, [facet.options]);

   const filteredOptions = React.useMemo(() => {
      return facetOptions
         .filter((option) => option.filteredHitCount > 0)
         .sort(sortItems);
   }, [facetOptions, sortItems]);

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
         {filteredOptions.map((option, index) => {
            if (multiple) {
               return (
                  <FilterCheckbox
                     key={option.handle}
                     name={option.handle}
                     isChecked={selectedOptions.includes(option.handle)}
                     onChange={handleChange}
                  >
                     {renderItem
                        ? renderItem(option, index, facetOptions)
                        : option.value}
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
                     {renderItem
                        ? renderItem(option, index, facetOptions)
                        : option.value}
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
