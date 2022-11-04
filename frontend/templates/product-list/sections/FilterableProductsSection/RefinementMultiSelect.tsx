import { Box, Checkbox, HStack, Text, VStack } from '@chakra-ui/react';
import * as React from 'react';

import { useDecoupledState } from '@ifixit/ui';
import { RefinementListRenderState } from 'instantsearch.js/es/connectors/refinement-list/connectRefinementList';
import { UseRefinementListProps } from 'react-instantsearch-hooks-web';
import { useFilteredRefinementList } from './useFilteredRefinementList';
import { useSortBy } from './useSortBy';
import { ShowMoreButton } from './ShowMoreButton';

type RefinementMultiSelectProps = UseRefinementListProps;

export function RefinementMultiSelect(props: RefinementMultiSelectProps) {
   const { items, refine, isShowingMore, toggleShowMore, canToggleShowMore } =
      useFilteredRefinementList({
         ...props,
         sortBy: useSortBy(props),
      });

   return (
      <Box>
         <VStack align="stretch" spacing="1" role="listbox">
            {items.map((item) => {
               return (
                  <MultiSelectItem
                     key={item.label}
                     item={item}
                     refine={refine}
                  />
               );
            })}
         </VStack>
         {canToggleShowMore && (
            <ShowMoreButton
               isShowingMore={isShowingMore}
               onClick={toggleShowMore}
            />
         )}
      </Box>
   );
}

type MultiSelectItemProps = {
   item: RefinementListRenderState['items'][0];
   refine: RefinementListRenderState['refine'];
};

const MultiSelectItem = React.memo(function MultiSelectItem({
   item,
   refine,
}: MultiSelectItemProps) {
   const [isRefined, setIsRefined] = useDecoupledState(item.isRefined);

   return (
      <HStack key={item.label} justify="space-between">
         <Checkbox
            role="option"
            value={item.value}
            isChecked={isRefined}
            onChange={() => {
               setIsRefined((current) => !current);
               refine(item.value);
            }}
            data-value={item.value}
         >
            {item.label}
         </Checkbox>
         <Text
            size="sm"
            fontFamily="sans-serif"
            color="gray.500"
            fontWeight={isRefined ? 'bold' : 'inherit'}
         >
            {item.count}
         </Text>
      </HStack>
   );
});
