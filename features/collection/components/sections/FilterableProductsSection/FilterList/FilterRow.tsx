import { Box, Divider, HStack } from '@chakra-ui/react';
import { Facet, FacetOption } from '@lib/algolia';
import React from 'react';
import { areEqual } from 'react-window';
import { FacetFilter } from './FacetFilter';
import { RangeFilter, RangeFilterInput, RangeFilterList } from './RangeFilter';
import {
   VirtualAccordionMachineState,
   VirtualAccordionSend,
} from './virtualAccordion.machine';

export const TOGGLE_ANIMATION_DURATION_MS = 250;

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

   const filteredOptionsCount = React.useMemo(() => {
      const facetOptions = Object.keys(facet.optionsByHandle).map(
         (handle) => facet.optionsByHandle[handle]
      );
      return facetOptions.filter((option) => option.filteredHitCount > 0)
         .length;
   }, [facet.optionsByHandle]);

   const isExpanded = state.context.expandedItemsIds.includes(facet.handle);
   const toggledIndex = React.useMemo(() => {
      return state.context.items.findIndex(
         (i) => i.handle === state.context.toggledItemId
      );
   }, [state.context.items, state.context.toggledItemId]);

   React.useEffect(() => {
      if (rowRef.current) {
         send({
            type: 'ITEM_SIZE_UPDATED',
            id: facet.handle,
            size: rowRef.current.getBoundingClientRect().height,
         });
      }
   }, [facet.handle, send, isExpanded, filteredOptionsCount]);

   return (
      <Row
         ref={rowRef}
         id={facet.handle}
         name={facet.name}
         isExpanded={isExpanded}
         shouldAnimate={
            state.value === 'toggleItemAnimation' && index > toggledIndex
         }
         animationOffset={state.context.toggledItemDelta || 0}
         facet={facet}
         showAllFacetValues={!state.context.areRefined}
         style={style}
         send={send}
      />
   );
},
areEqual);

interface RowProps {
   id: string;
   name: string;
   isExpanded: boolean;
   shouldAnimate?: boolean;
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
         shouldAnimate,
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
            className={shouldAnimate ? 'toggle-animation' : ''}
            sx={{
               '--offset': `${animationOffset}px`,
               '@keyframes toggle-slide': {
                  from: {
                     transform: 'translateY(var(--offset))',
                  },
                  to: {
                     transform: 'translateY(0)',
                  },
               },
               '&.toggle-animation': {
                  animation: `toggle-slide ${TOGGLE_ANIMATION_DURATION_MS}ms ease-in-out`,
               },
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
                           transition: `transform ${TOGGLE_ANIMATION_DURATION_MS}ms`,
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
                     {facet.handle === 'price_range' ? (
                        <>
                           <RangeFilter>
                              <RangeFilterList
                                 facetHandle={facet.handle}
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
                                 facetHandle="price"
                                 minFieldPrefix="$"
                                 minFieldPlaceholder="Min"
                                 maxFieldPrefix="$"
                                 maxFieldPlaceholder="Max"
                              />
                           </RangeFilter>
                        </>
                     ) : (
                        <>
                           <FacetFilter
                              key={facet.handle}
                              facetHandle={facet.handle}
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
                        animation={`slidedown ${TOGGLE_ANIMATION_DURATION_MS}ms ease-in-out`}
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

function sortByPriceRange(a: FacetOption, b: FacetOption): number {
   const [aMin] = parseRange(a.value);
   const [bMin] = parseRange(b.value);
   return aMin - bMin;
}
