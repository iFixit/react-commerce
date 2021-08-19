import { Radio, Text, VStack } from '@chakra-ui/react';
import {
   FacetValueState,
   ListFilter as ListFilterType,
   useFacetFilterList,
   useFacetValues,
} from '@lib/algolia';
import * as React from 'react';
import { FilterCheckbox } from './FilterCheckbox';

export type ListFilterProps = {
   facetName: string;
   type?: ListFilterType['type'];
   multiple?: boolean;
   showAllValues?: boolean;
   sortItems?(a: FacetValueState, b: FacetValueState): number;
   renderItem?(
      item: FacetValueState,
      index: number,
      list: FacetValueState[]
   ): React.ReactNode;
};

export function ListFilter({
   facetName,
   type = 'or',
   multiple = false,
   showAllValues = false,
   renderItem,
   sortItems = defaultSortItems,
}: ListFilterProps) {
   const { isLoaded, values } = useFacetValues(facetName);
   const { selectedValueIds, toggle, set } = useFacetFilterList(facetName, {
      filterType: type,
   });

   const filteredValues = React.useMemo(() => {
      return values
         .slice()
         .filter((item) => item.filteredHitCount > 0)
         .sort(sortItems);
   }, [sortItems, values]);

   const displayedValues = React.useMemo(() => {
      const items = showAllValues ? values.slice() : filteredValues.slice();
      items.sort(sortItems);
      return items;
   }, [filteredValues, showAllValues, sortItems, values]);

   const handleChange = React.useCallback(
      (name: string) => {
         toggle(name);
      },
      [toggle]
   );

   if (!isLoaded) {
      return null;
   }
   return (
      <VStack align="flex-start">
         {displayedValues.map((item, index) => {
            if (multiple) {
               return (
                  <FilterCheckbox
                     key={item.id}
                     name={item.id}
                     isChecked={selectedValueIds.includes(item.id)}
                     onChange={handleChange}
                  >
                     {renderItem ? renderItem(item, index, values) : item.value}
                  </FilterCheckbox>
               );
            }
            return (
               <Radio
                  key={index}
                  value={item.value}
                  isChecked={selectedValueIds.includes(item.id)}
                  onChange={() => set(item.id)}
               >
                  <Text fontSize="sm">
                     {renderItem ? renderItem(item, index, values) : item.value}
                  </Text>
               </Radio>
            );
         })}
      </VStack>
   );
}

function defaultSortItems(a: FacetValueState, b: FacetValueState): number {
   return a.value.localeCompare(b.value);
}
