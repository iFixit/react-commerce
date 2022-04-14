import { Box, Divider, HStack, Icon, VStack } from '@chakra-ui/react';
import { Facet, FacetOption, useFacet } from '@lib/algolia';
import React from 'react';
import { HiChevronDown } from 'react-icons/hi';
import { areEqual } from 'react-window';
import { ListFilter } from './ListFilter';
import { RangeFilterInput } from './RangeFilterInput';
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
      const facetOptions = facet.options.allIds.map(
         (id) => facet.options.byId[id]
      );
      return facetOptions.filter((option) => option.filteredHitCount > 0)
         .length;
   }, [facet.options]);

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

   const onResize = React.useCallback(() => {
      if (rowRef.current) {
         send({
            type: 'ITEM_SIZE_UPDATED',
            id: facet.handle,
            size: rowRef.current.getBoundingClientRect().height,
         });
      }
   }, [facet.handle, rowRef, send]);

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
         onResize={onResize}
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
   onResize(): void;
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
         onResize,
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

      const accordionItemPanelId = `accordion-item-panel-${facet.handle}`;

      return (
         <Box
            style={style}
            overflow="hidden"
            px="3"
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
                  <HStack
                     as="button"
                     fontWeight="semibold"
                     onClick={onToggle}
                     py="3"
                     px="1.5"
                     w="full"
                     bg="white"
                     transition="background-color 300ms"
                     _hover={{
                        bg: 'gray.50',
                     }}
                     aria-label={
                        isExpanded
                           ? `Collapse ${facet.name}`
                           : `Expand ${facet.name}`
                     }
                     aria-expanded={isExpanded}
                     aria-controls={accordionItemPanelId}
                  >
                     <Box flex="1" textAlign="left">
                        {name}
                     </Box>
                     <Box
                        ml="2"
                        color="gray.500"
                        style={{
                           transform: `rotate(${isExpanded ? '180' : '0'}deg)`,
                           transition: `transform ${TOGGLE_ANIMATION_DURATION_MS}ms`,
                        }}
                        display="flex"
                        alignItems="center"
                     >
                        <Icon as={HiChevronDown} boxSize="5" />
                     </Box>
                  </HStack>
               </Box>
               {isExpanded && (
                  <Box
                     id={accordionItemPanelId}
                     data-testid={accordionItemPanelId}
                     ref={itemBodyRef}
                     pt="2"
                     pb="4"
                     px="1.5"
                     pos="relative"
                     bg="white"
                     data-test="accordion-panel"
                  >
                     {(() => {
                        switch (true) {
                           case facet.handle === 'price_range':
                              return (
                                 <PriceFilter
                                    priceRangeFacet={facet}
                                    showAllFacetValues={showAllFacetValues}
                                    onResize={onResize}
                                 />
                              );
                           default:
                              return (
                                 <ListFilter
                                    key={facet.handle}
                                    facet={facet}
                                    multiple
                                    showAllValues={showAllFacetValues}
                                 />
                              );
                        }
                     })()}

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
               <Divider />
            </Box>
         </Box>
      );
   })
);

interface PriceFilterProps {
   priceRangeFacet: Facet;
   showAllFacetValues: boolean;
   onResize(): void;
}

function PriceFilter({
   priceRangeFacet,
   showAllFacetValues,
   onResize,
}: PriceFilterProps) {
   const priceFacet = useFacet('price');
   return (
      <VStack align="flex-start">
         <ListFilter
            key={priceRangeFacet.handle}
            facet={priceRangeFacet}
            multiple
            dependentFacets={[priceFacet.handle]}
            showAllValues={showAllFacetValues}
            sortItems={sortByPriceRange}
         />
         <RangeFilterInput
            facet={priceFacet}
            minFieldPrefix="$"
            minFieldPlaceholder="Min"
            maxFieldPrefix="$"
            maxFieldPlaceholder="Max"
            dependentFacets={[priceRangeFacet.handle]}
            onError={onResize}
            onDismissError={onResize}
         />
      </VStack>
   );
}

function sortByPriceRange(a: FacetOption, b: FacetOption): number {
   const aAvg = avg(a.value);
   const bAvg = avg(b.value);

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
}

function avg(x: string): number | null {
   const nums = x.match(/\d+/g);
   if (nums == null) {
      return null;
   }
   return nums.reduce((x, y) => x + parseFloat(y), 0) / nums.length;
}
