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
import { UseRefinementListProps } from 'react-instantsearch-hooks-web';
import { useFilteredRefinementList } from './useFilteredRefinementList';
import { useSortBy } from './useSortBy';

export type RefinementListProps = UseRefinementListProps;

export function RefinementList(props: RefinementListProps) {
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
   const [isRefined, setIsRefined] = useDecoupledState(item.isRefined);

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

/**
 * Creates a decoupled state value that is kept is sync with the provided state.
 * The purpose of this hook is to make an input field feel more responsive when the
 * state update depends on async requests.
 * @param state The state that is being decoupled
 * @returns The decoupled state
 */
function useDecoupledState<Type = any>(
   state: Type
): [Type, React.Dispatch<React.SetStateAction<Type>>] {
   const [decoupledState, setDecoupledState] = React.useState(state);

   React.useEffect(() => {
      setDecoupledState(state);
   }, [state]);

   return [decoupledState, setDecoupledState];
}
