import { Box, Checkbox, HStack, Text, VStack } from '@chakra-ui/react';
import { formatFacetName } from '@helpers/algolia-helpers';
import { useDecoupledState } from '@ifixit/ui';
import { FacetOption } from 'app/_data/product-list/concerns/facets';
import * as React from 'react';
import { ShowMoreButton } from './ShowMoreButton';
import { RefinementListFacetState } from './useRefinementListFacet';

const MAX_VISIBLE_OPTIONS = 10;

type RefinementListFacetProps = {
   attribute: string;
   items: FacetOption[];
   refine: (value: string) => void;
};

type RefinementListItem = RefinementListFacetState['items'][0];

export function RefinementListFacet({
   attribute,
   items,
   refine,
}: RefinementListFacetProps) {
   const formattedFacetName = formatFacetName(attribute);
   const visibleOptions = items.slice(0, MAX_VISIBLE_OPTIONS);
   const hiddenOptions = items.slice(MAX_VISIBLE_OPTIONS);
   const hasHiddenOptions = hiddenOptions.length > 0;

   return (
      <Box>
         <VStack
            align="stretch"
            spacing="2"
            role="listbox"
            aria-label={`${formattedFacetName} options`}
         >
            {visibleOptions.map((item) => {
               return (
                  <RefinementListItem
                     key={item.value}
                     item={item}
                     refine={refine}
                  />
               );
            })}
         </VStack>
         {hasHiddenOptions && (
            <ShowMoreButton isShowingMore={false} onClick={() => {}} />
         )}
      </Box>
   );
}

type RefinementListItemProps = {
   item: FacetOption;
   refine: (value: string) => void;
};

const RefinementListItem = React.memo(function RefinementListItem({
   item,
   refine,
}: RefinementListItemProps) {
   const [isRefined, setIsRefined] = useDecoupledState(item.selected);

   return (
      <HStack key={item.value} justify="space-between">
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
            {item.value}
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
