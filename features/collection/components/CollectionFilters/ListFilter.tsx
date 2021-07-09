import { Checkbox, Radio, Text, VStack } from '@chakra-ui/react';
import {
   FacetValueState,
   ListFilter as ListFilterType,
   useFacetFilterList,
   useFacetValues,
} from '@lib/algolia';
import * as React from 'react';

export type ListFilterProps = {
   facetName: string;
   type?: ListFilterType['type'];
   multiple?: boolean;
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
   renderItem,
   sortItems = defaultSortItems,
}: ListFilterProps) {
   const { isLoaded, values } = useFacetValues(facetName);
   const { selectedValueIds, toggle, set } = useFacetFilterList(facetName, {
      filterType: type,
   });

   if (!isLoaded) {
      return null;
   }
   return (
      <VStack align="flex-start">
         {values
            .slice()
            .sort(sortItems)
            .map((item, index) => {
               if (multiple) {
                  return (
                     <Checkbox
                        key={index}
                        isChecked={selectedValueIds.includes(item.id)}
                        onChange={() => toggle(item.id)}
                     >
                        <Text fontSize="sm">
                           {renderItem
                              ? renderItem(item, index, values)
                              : item.value}
                        </Text>
                     </Checkbox>
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
                        {renderItem
                           ? renderItem(item, index, values)
                           : item.value}
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
