import { Radio, Text, VStack } from '@chakra-ui/react';
import { Facet, FacetOption, useFacetFilter } from '@lib/algolia';
import * as React from 'react';
import { FilterCheckbox } from './FilterCheckbox';

export type ListFilterProps = {
   facet: Facet;
   multiple?: boolean;
   showAllValues?: boolean;
   sortItems?(a: FacetOption, b: FacetOption): number;
   renderItem?(
      item: FacetOption,
      index: number,
      list: FacetOption[]
   ): React.ReactNode;
};

export function ListFilter({
   facet,
   multiple = false,
   showAllValues = false,
   renderItem,
   sortItems = defaultSortItems,
}: ListFilterProps) {
   const { selectedOptions, toggle, set } = useFacetFilter(facet.handle);

   const facetOptions = React.useMemo(() => {
      return facet.options.allIds.map((id) => facet.options.byId[id]);
   }, [facet.options]);

   const filteredOptions = React.useMemo(() => {
      return facetOptions
         .filter((option) => option.filteredHitCount > 0)
         .sort(sortItems);
   }, [facetOptions, sortItems]);

   const visibleOptions = React.useMemo(() => {
      const options = showAllValues
         ? facetOptions.slice()
         : filteredOptions.slice();
      options.sort(sortItems);
      return options;
   }, [facetOptions, filteredOptions, showAllValues, sortItems]);

   const handleChange = React.useCallback(
      (optionHandle: string) => {
         toggle(optionHandle);
      },
      [toggle]
   );

   return (
      <VStack align="flex-start" role="listbox">
         {visibleOptions.map((option, index) => {
            if (multiple) {
               return (
                  <FilterCheckbox
                     key={option.handle}
                     name={option.handle}
                     isChecked={selectedOptions.includes(option.handle)}
                     onChange={handleChange}
                     role="option"
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
                  onChange={() => set(option.handle)}
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
