import { chakra, VStack } from '@chakra-ui/react';
import React from 'react';
import { RefinementList } from './RefinementList';

type CollectionFiltersProps = {
   className?: string;
};

export const CollectionFilters = chakra(
   ({ className }: CollectionFiltersProps) => {
      return (
         <VStack spacing={4} align="stretch" className={className}>
            <RefinementList
               title="Category"
               facet="named_tags.Tool Category"
               multiple
            />
            <RefinementList title="Condition" facet="options.condition_code" />
         </VStack>
      );
   }
);
