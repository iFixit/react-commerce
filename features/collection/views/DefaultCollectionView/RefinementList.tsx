import {
   Badge,
   Checkbox,
   Divider,
   HStack,
   Radio,
   Stack,
   Text,
   VStack,
} from '@chakra-ui/react';
import { ListFilter, useRefinementList } from '@libs/algolia';
import * as React from 'react';

export type RefinementListProps = {
   facet: string;
   title: string;
   type?: ListFilter['type'];
   multiple?: boolean;
};

export function RefinementList({
   facet,
   title,
   type = 'or',
   multiple = false,
}: RefinementListProps) {
   const { isLoaded, values, currentValueIds, toggle, set } = useRefinementList(
      facet,
      {
         refinementType: type,
      }
   );
   if (!isLoaded) {
      return null;
   }
   return (
      <Stack spacing={2}>
         <Text fontWeight="semibold">{title}</Text>
         <Divider />
         <VStack align="flex-start">
            {values.map((valueState, index) => {
               if (multiple) {
                  return (
                     <Checkbox
                        key={index}
                        isChecked={currentValueIds.includes(valueState.id)}
                        onChange={() => toggle(valueState.id)}
                     >
                        <HStack>
                           <Text fontSize="sm">{valueState.value}</Text>
                           <Badge>
                              {valueState.filteredHitCount}/
                              {valueState.totalHitCount}
                           </Badge>
                        </HStack>
                     </Checkbox>
                  );
               }
               return (
                  <Radio
                     key={index}
                     value={valueState.value}
                     isChecked={currentValueIds.includes(valueState.id)}
                     onChange={() => set(valueState.id)}
                  >
                     <Text fontSize="sm">
                        {valueState.value}
                        <Badge>{valueState.filteredHitCount}</Badge>
                     </Text>
                  </Radio>
               );
            })}
         </VStack>
      </Stack>
   );
}
