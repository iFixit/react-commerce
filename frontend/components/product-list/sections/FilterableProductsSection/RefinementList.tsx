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
      useRefinementList({
         ...props,
         sortBy: getSortBy(props),
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

const getSortBy = (props: RefinementListProps) => {
   switch (props.attribute) {
      case 'price_range':
         return sortByPriceRange;
      case 'facet_tags.Capacity':
         return sortByCapacityHighToLow;
      default:
         return props.sortBy;
   }
};

const sortByPriceRange: RefinementListProps['sortBy'] = (a, b) => {
   const aAvg = avg(a.escapedValue);
   const bAvg = avg(b.escapedValue);

   if (aAvg == null && bAvg == null) {
      return 0;
   }
   if (aAvg == null) {
      return 1;
   }
   if (bAvg == null) {
      return -1;
   }
   return aAvg - bAvg;
};

function avg(x: string): number | null {
   const nums = x.match(/\d+/g);
   if (nums == null) {
      return null;
   }
   return nums.reduce((x, y) => x + parseFloat(y), 0) / nums.length;
}

const sortByCapacityHighToLow: RefinementListProps['sortBy'] = (a, b) => {
   return capacityToBytes(b.escapedValue) - capacityToBytes(a.escapedValue);
};

const unitToBytes = {
   B: 1,
   KB: 1024,
   MB: 1024 ** 2,
   GB: 1024 ** 3,
   TB: 1024 ** 4,
   PB: 1024 ** 5,
};

function capacityToBytes(x: string): number {
   const size = parseFloat(x);
   if (isNaN(size)) {
      return 0;
   }
   const unit = (x.match(/[KMGTP]?B/)?.[0] ?? 'B') as keyof typeof unitToBytes;
   return size * (unitToBytes[unit] ?? 1);
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
