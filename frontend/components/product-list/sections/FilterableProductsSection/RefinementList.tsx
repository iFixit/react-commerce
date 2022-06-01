import {
   Box,
   Button,
   Checkbox,
   HStack,
   Icon,
   Text,
   VStack,
} from '@chakra-ui/react';
import * as React from 'react';
import { HiSelector } from 'react-icons/hi';
import {
   useRefinementList,
   UseRefinementListProps,
} from 'react-instantsearch-hooks-web';

export type RefinementListProps = UseRefinementListProps;

export function RefinementList(props: RefinementListProps) {
   const { items, refine, isShowingMore, toggleShowMore, canToggleShowMore } =
      useRefinementList(props);

   return (
      <Box>
         <VStack align="stretch" spacing="1" role="listbox">
            {items.map((item) => {
               return (
                  <RefinementListItem
                     key={item.label}
                     label={item.label}
                     value={item.value}
                     isRefined={item.isRefined}
                     count={item.count}
                     onChange={refine}
                  />
               );
            })}
         </VStack>
         {canToggleShowMore && (
            <Button
               variant="ghost"
               fontWeight="normal"
               leftIcon={
                  <Icon as={HiSelector} boxSize="6" color="gray.600" ml="-1" />
               }
               mt="3"
               p="0"
               w="full"
               justifyContent="flex-start"
               onClick={toggleShowMore}
            >
               {isShowingMore ? 'Show less' : 'Show more'}
            </Button>
         )}
      </Box>
   );
}

type RefinementListItemProps = {
   label: string;
   value: string;
   isRefined: boolean;
   count: number;
   onChange: (value: string) => void;
};

const RefinementListItem = React.memo(function RefinementListItem(
   props: RefinementListItemProps
) {
   const { onChange, ...item } = props;
   const [isRefined, setIsRefined] = React.useState(item.isRefined);

   React.useEffect(() => {
      setIsRefined(item.isRefined);
   }, [item.isRefined]);

   return (
      <HStack key={item.label} justify="space-between">
         <Checkbox
            role="option"
            value={item.value}
            isChecked={isRefined}
            onChange={() => {
               setIsRefined((current) => !current);
               onChange(item.value);
            }}
            data-value={item.value}
         >
            {item.label}
         </Checkbox>
         <Text size="sm" fontFamily="sans-serif" color="gray.500">
            {item.count}
         </Text>
      </HStack>
   );
});
