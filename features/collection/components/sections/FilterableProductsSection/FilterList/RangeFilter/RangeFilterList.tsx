import { Radio, Text, VStack } from '@chakra-ui/react';
import {
   FacetValueState,
   ListFilter,
   useFacetFilterList,
   useFacetValues,
} from '@lib/algolia';
import * as React from 'react';
import { FilterCheckbox } from '../FilterCheckbox';
import { useRangeFilterContext, useRegisterFacet } from './context';

export type RangeFilterListProps = {
   facetName: string;
   type?: ListFilter['type'];
   multiple?: boolean;
   sortItems?(a: FacetValueState, b: FacetValueState): number;
   renderItem?(item: RangeItem): React.ReactNode;
};

interface RangeItem extends FacetValueState {
   isRangeStart: boolean;
   isRangeEnd: boolean;
}

export function RangeFilterList({
   facetName,
   type = 'or',
   multiple = false,
   renderItem,
   sortItems = defaultSortItems,
}: RangeFilterListProps) {
   const { getFacetNames } = useRangeFilterContext();
   const { isLoaded, values } = useFacetValues(facetName);
   const { selectedValueIds, toggle, set } = useFacetFilterList(facetName, {
      filterType: type,
   });
   useRegisterFacet(facetName);

   const items = React.useMemo<RangeItem[]>(() => {
      return values
         .slice()
         .map<RangeItem>((value, index) => ({
            ...value,
            isRangeStart: index === 0,
            isRangeEnd: index === values.length - 1,
         }))
         .filter((value) => value.filteredHitCount > 0)
         .sort(sortItems);
   }, [sortItems, values]);

   const handleChange = React.useCallback(
      (name: string) => {
         const facetNames = getFacetNames();
         const facetToBeCleared = facetNames.filter(
            (name) => name !== facetName
         );
         toggle(name, { clearFacets: facetToBeCleared });
      },
      [facetName, getFacetNames, toggle]
   );

   if (!isLoaded) {
      return null;
   }
   return (
      <VStack align="flex-start">
         {items.map((item, index) => {
            if (multiple) {
               return (
                  <FilterCheckbox
                     key={item.id}
                     name={item.id}
                     isChecked={selectedValueIds.includes(item.id)}
                     onChange={handleChange}
                  >
                     {renderItem ? renderItem(item) : item.value}
                  </FilterCheckbox>
               );
            }
            return (
               <Radio
                  key={index}
                  value={item.value}
                  isChecked={selectedValueIds.includes(item.id)}
                  onChange={() => {
                     const facetNames = getFacetNames();
                     const facetToBeCleared = facetNames.filter(
                        (name) => name !== facetName
                     );
                     set(item.id, { clearFacets: facetToBeCleared });
                  }}
               >
                  <Text fontSize="sm">
                     {renderItem ? renderItem(item) : item.value}
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
