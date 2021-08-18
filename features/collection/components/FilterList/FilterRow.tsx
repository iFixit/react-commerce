import { Box, Divider, HStack } from '@chakra-ui/react';
import { formatFacetName } from '@features/collection/utils';
import { Facet, FacetValueState } from '@lib/algolia';
import React from 'react';
import { areEqual } from 'react-window';
import { ListFilter } from './ListFilter';
import { RangeFilter, RangeFilterInput, RangeFilterList } from './RangeFilter';
import {
   VirtualAccordionMachineState,
   VirtualAccordionSend,
} from './virtualAccordion.machine';

export type ItemData = [
   VirtualAccordionMachineState<Facet>,
   VirtualAccordionSend<Facet>
];

export interface FilterRowProps {
   data: ItemData;
   index: number;
   style: React.CSSProperties;
}

export const FilterRow = React.memo(function FilterRow({
   data,
   index,
   style,
}: FilterRowProps) {
   const rowRef = React.useRef<HTMLElement | null>(null);
   const [state, send] = data;
   const facet = state.context.items[index];
   const filteredValuesCount = facet.values.filter(
      (val) => val.filteredHitCount > 0
   ).length;

   const isExpanded = state.context.expandedItemsIds.includes(facet.name);
   const toggledIndex = React.useMemo(() => {
      return state.context.items.findIndex(
         (i) => i.name === state.context.toggledItemId
      );
   }, [state.context.items, state.context.toggledItemId]);

   const isMountedRef = React.useRef(false);

   React.useEffect(() => {
      isMountedRef.current = true;
   }, []);

   React.useEffect(() => {
      if (rowRef.current) {
         send({
            type: 'ITEM_SIZE_UPDATED',
            id: facet.name,
            size: rowRef.current.getBoundingClientRect().height,
         });
      }
   }, [facet.name, send, isExpanded, filteredValuesCount]);

   const name = formatFacetName(facet.name);

   const animation = React.useMemo<RowAnimation | undefined>(() => {
      if (state.value === 'toggleItemAnimation' && index > toggledIndex) {
         return RowAnimation.VerticalSlide;
      }
      if (state.value === 'itemsAnimation' && !isMountedRef.current) {
         return RowAnimation.HorizontalSlide;
      }
      return undefined;
   }, [index, state.value, toggledIndex]);

   return (
      <Row
         ref={rowRef}
         id={facet.name}
         name={name}
         isExpanded={isExpanded}
         animation={animation}
         animationOffset={state.context.toggledItemDelta || 0}
         facet={facet}
         showAllFacetValues={!state.context.areRefined}
         style={style}
         send={send}
      />
   );
},
areEqual);

enum RowAnimation {
   VerticalSlide = 'vertical-slide-animation',
   HorizontalSlide = 'horizontal-slide-animation',
}

interface RowProps {
   id: string;
   name: string;
   isExpanded: boolean;
   animation?: RowAnimation;
   animationOffset: number;
   facet: Facet;
   showAllFacetValues: boolean;
   style: React.CSSProperties;
   send: VirtualAccordionSend<Facet>;
}

const Row = React.memo(
   React.forwardRef<any, RowProps>(function Row(
      {
         id,
         name,
         facet,
         isExpanded,
         animation,
         animationOffset,
         showAllFacetValues,
         style,
         send,
      },
      ref
   ) {
      const itemBodyRef = React.useRef<HTMLDivElement | null>(null);

      const onToggle = React.useCallback(() => {
         send({
            type: 'TOGGLE_ITEM',
            id,
         });
      }, [id, send]);

      return (
         <Box
            style={style}
            overflow="hidden"
            px="6"
            className={animation}
            sx={{
               '--offset': `${animationOffset}px`,
               '@keyframes vertical-slide': {
                  from: {
                     transform: 'translateY(var(--offset))',
                  },
                  to: {
                     transform: 'translateY(0)',
                  },
               },
               '@keyframes horizontal-slide': {
                  from: {
                     transform: 'translateX(-100%)',
                  },
                  to: {
                     transform: 'translateX(0)',
                  },
               },
               [`&.${RowAnimation.VerticalSlide}`]: {
                  animation: 'vertical-slide 250ms ease-in-out',
               },
               // [`&.${RowAnimation.HorizontalSlide}`]: {
               //    animationName: 'horizontal-slide',
               //    animationDuration: '300ms',
               // },
            }}
         >
            <Box ref={ref}>
               <Box>
                  <Divider />
                  <HStack
                     as="button"
                     fontWeight="semibold"
                     onClick={onToggle}
                     py="2"
                     w="full"
                     bg="white"
                     transition="background-color 300ms"
                     _hover={{
                        bg: 'gray.50',
                     }}
                  >
                     <Box flex="1" textAlign="left">
                        {name}
                     </Box>
                     <Box
                        px="2"
                        color="gray.500"
                        style={{
                           transform: `rotate(${isExpanded ? '45' : '0'}deg)`,
                           transition: 'transform 300ms',
                        }}
                     >
                        +
                     </Box>
                  </HStack>
               </Box>
               {isExpanded && (
                  <Box
                     ref={itemBodyRef}
                     pt="2"
                     pb="4"
                     pos="relative"
                     bg="white"
                  >
                     {facet.name === 'price_range' ? (
                        <>
                           <RangeFilter>
                              <RangeFilterList
                                 facetName={facet.name}
                                 multiple
                                 sortItems={sortByPriceRange}
                                 renderItem={(item, index, list) => {
                                    const [min, max] = parseRange(item.value);
                                    if (index === 0) {
                                       return `Under $${max}`;
                                    }
                                    if (index === list.length - 1) {
                                       return `$${min} +`;
                                    }
                                    return `$${min} - $${max}`;
                                 }}
                              />
                              <RangeFilterInput
                                 facetName="price"
                                 minFieldPrefix="$"
                                 minFieldPlaceholder="Min"
                                 maxFieldPrefix="$"
                                 maxFieldPlaceholder="Max"
                              />
                           </RangeFilter>
                        </>
                     ) : (
                        <>
                           <ListFilter
                              key={facet.name}
                              facetName={facet.name}
                              multiple
                              showAllValues={showAllFacetValues}
                           />
                        </>
                     )}
                     <Box
                        sx={{
                           '@keyframes slidedown': {
                              from: {
                                 height: '100%',
                              },
                              to: {
                                 height: '0',
                              },
                           },
                        }}
                        position="absolute"
                        bg="white"
                        bottom="0"
                        left="0"
                        w="full"
                        h="0"
                        animation="slidedown 250ms ease-in-out"
                     />
                  </Box>
               )}
            </Box>
         </Box>
      );
   })
);

function parseRange(value: string): [number, number] {
   const [min, max] = value.split(':');
   return [parseFloat(min), parseFloat(max)];
}

function sortByPriceRange(a: FacetValueState, b: FacetValueState): number {
   const [aMin] = parseRange(a.value);
   const [bMin] = parseRange(b.value);
   return aMin - bMin;
}
