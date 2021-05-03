import {
   Checkbox,
   Divider,
   Stack,
   Text,
   VStack,
   Radio,
   Badge,
} from '@chakra-ui/react';
import * as React from 'react';
import { useRefinementList, FilterClause } from '@libs/algolia';

export type RefinementListProps = {
   facet: string;
   title: string;
   type?: FilterClause['type'];
   multiple?: boolean;
};

export function RefinementList({
   facet,
   title,
   type = 'or',
   multiple = false,
}: RefinementListProps) {
   const { items, currentRefinements, toggle, set } = useRefinementList(facet, {
      refinementType: type,
   });
   return (
      <Stack spacing={2}>
         <Text fontWeight="semibold">{title}</Text>
         <Divider />
         <VStack align="flex-start">
            {items.map((item, index) => {
               if (multiple) {
                  return (
                     <Checkbox
                        key={index}
                        isChecked={currentRefinements?.includes(item.value)}
                        onChange={() => toggle(item.value)}
                     >
                        <Text fontSize="sm">
                           {item.value}
                           <Badge>
                              {item.applicableCount}/{item.totalCount}
                           </Badge>
                        </Text>
                     </Checkbox>
                  );
               }
               return (
                  <Radio
                     key={index}
                     value={item.value}
                     isChecked={currentRefinements.includes(item.value)}
                     onChange={() => set(item.value)}
                  >
                     <Text fontSize="sm">
                        {item.value}
                        <Badge>
                           {item.applicableCount}/{item.totalCount}
                        </Badge>
                     </Text>
                  </Radio>
               );
            })}
         </VStack>
      </Stack>
   );
}
