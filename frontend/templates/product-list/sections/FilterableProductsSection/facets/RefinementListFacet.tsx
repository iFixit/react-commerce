import { Box, Checkbox, HStack, Text, VStack } from '@chakra-ui/react';
import { formatFacetName } from '@helpers/algolia-helpers';
import { useDecoupledState } from '@ifixit/ui';
import * as React from 'react';
import { ShowMoreButton } from './ShowMoreButton';
import { RefinementListFacetState } from './useRefinementListFacet';

type RefinementListFacetProps = {
   attribute: string;
   items: RefinementListItem[];
   refine: (value: string) => void;
   canToggleShowMore?: boolean;
   isShowingMore?: boolean;
   onToggleShowMore?: () => void;
};

type RefinementListItem = RefinementListFacetState['items'][0];

export function RefinementListFacet({
   attribute,
   items,
   refine,
   canToggleShowMore,
   isShowingMore = false,
   onToggleShowMore,
}: RefinementListFacetProps) {
   const formattedFacetName = formatFacetName(attribute);

   return (
      <Box>
         <VStack
            align="stretch"
            spacing="2"
            role="listbox"
            aria-label={`${formattedFacetName} options`}
         >
            {items.map((item) => {
               return (
                  <RefinementListItem
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
               onClick={onToggleShowMore}
            />
         )}
      </Box>
   );
}

type RefinementListItemProps = {
   item: RefinementListItem;
   refine: (value: string) => void;
};

const RefinementListItem = React.memo(function RefinementListItem({
   item,
   refine,
}: RefinementListItemProps) {
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
            fontWeight={isRefined ? 'semibold' : 'inherit'}
         >
            {item.label}
         </Checkbox>
         <Text
            size="sm"
            fontFamily="sans-serif"
            color="gray.500"
            fontWeight={isRefined ? 'semibold' : 'inherit'}
         >
            {item.count}
         </Text>
      </HStack>
   );
});
