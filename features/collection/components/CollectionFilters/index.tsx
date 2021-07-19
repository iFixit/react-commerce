import { Box, chakra, Divider, HStack, Stack } from '@chakra-ui/react';
import { formatFacetName } from '@features/collection/utils';
import { Facet, FacetValueState, useFacets } from '@lib/algolia';
import React from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import {
   VariableSizeList,
   VariableSizeListProps,
   areEqual,
} from 'react-window';
import { ClearButton } from './ClearButton';
import { ListFilter } from './ListFilter';
import {
   MeasuredContentProvider,
   useMeasureContent,
   useMeasuredContentContext,
} from './MeasuredContent';
import { RangeFilter, RangeFilterInput, RangeFilterList } from './RangeFilter';
import memoize from 'memoize-one';

interface CollectionFiltersProps {
   className?: string;
}

const FACET_BLOCKLIST = [
   'tags',
   'vendor',
   'collections',
   'option_names',
   'collection_ids',
   'named_tags_names',
   'named_tags.worksin',
   'price',
   'inventory_management',
];

const Sizer = chakra(AutoSizer);

export const CollectionFilters = chakra(
   ({ className }: CollectionFiltersProps) => {
      const facets = useFacets();
      const sortedFacets = React.useMemo(() => {
         return facets.slice().sort((a, b) => a.name.localeCompare(b.name));
      }, [facets]);
      const filteredFacets = React.useMemo(() => {
         return sortedFacets.filter(filterFacet);
      }, [sortedFacets]);
      const [expandedFacets, setExpandedFacets] = React.useState<string[]>([]);
      const toggleFacet = React.useCallback((name: string) => {
         setExpandedFacets((current) => {
            if (current.includes(name)) {
               return current.filter((f) => f !== name);
            }
            return [...current, name];
         });
      }, []);

      const itemData = createItemData(
         filteredFacets,
         expandedFacets,
         toggleFacet
      );

      return (
         <MeasuredContentProvider>
            <Sizer className={className}>
               {({ height, width }) => {
                  return (
                     <FilterList
                        height={height}
                        itemCount={filteredFacets.length}
                        estimatedItemSize={40}
                        width={width}
                        itemData={itemData}
                     >
                        {FilterRow}
                     </FilterList>
                  );
               }}
            </Sizer>
         </MeasuredContentProvider>
      );
   }
);

const createItemData = memoize(
   (
      facets: Facet[],
      expandedFacets: string[],
      toggleFacet: (name: string) => void
   ): ListItemData => ({
      facets,
      expandedFacets,
      toggleFacet,
   })
);

function FilterList(props: Omit<VariableSizeListProps, 'itemSize'>) {
   const { listRef, getSize } = useMeasuredContentContext();

   return <VariableSizeList ref={listRef} {...props} itemSize={getSize} />;
}

interface ListItemData {
   facets: Facet[];
   expandedFacets: string[];
   toggleFacet(name: string): void;
}

interface FilterRowProps {
   data: ListItemData;
   index: number;
   style: any;
}

const FilterRow = React.memo(({ data, index, style }: FilterRowProps) => {
   const { facets, expandedFacets, toggleFacet } = data;
   const facet = facets[index];

   const onToggle = React.useCallback(() => {
      toggleFacet(facet.name);
   }, [facet.name, toggleFacet]);

   return (
      <Box style={style} px="6">
         <ListItem
            facet={facet}
            index={index}
            isExpanded={expandedFacets.includes(facet.name)}
            onToggle={onToggle}
         />
      </Box>
   );
}, areEqual);

function filterFacet(facet: Facet): boolean {
   return (
      !FACET_BLOCKLIST.includes(facet.name) &&
      facet.values.length > 1 &&
      facet.values.some((value) => value.filteredHitCount > 0)
   );
}

function parseRange(value: string): [number, number] {
   const [min, max] = value.split(':');
   return [parseFloat(min), parseFloat(max)];
}

function sortByPriceRange(a: FacetValueState, b: FacetValueState): number {
   const [aMin] = parseRange(a.value);
   const [bMin] = parseRange(b.value);
   return aMin - bMin;
}

interface ListItemProps {
   facet: Facet;
   index: number;
   isExpanded: boolean;
   onToggle(): void;
}

function ListItem({ facet, index, isExpanded, onToggle }: ListItemProps) {
   const name = formatFacetName(facet.name);
   const { ref, reset } = useMeasureContent<HTMLDivElement>(index, [
      isExpanded,
   ]);

   // React.useEffect(() => {
   //    reset();
   //    // eslint-disable-next-line react-hooks/exhaustive-deps
   // }, [isExpanded]);

   return (
      <Stack ref={ref} spacing="2">
         <Box>
            <HStack
               as="button"
               fontWeight="semibold"
               onClick={onToggle}
               py="2"
               w="full"
            >
               <Box flex="1" textAlign="left">
                  {name}
               </Box>
               <Box
                  style={{ transform: `rotate(${isExpanded ? '45' : '0'}deg)` }}
               >
                  +
               </Box>
            </HStack>
            <Divider />
         </Box>
         {isExpanded && (
            <Box pb="4">
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
                     <ClearButton onlyFacetNames={['price', 'price_range']}>
                        clear
                     </ClearButton>
                  </>
               ) : (
                  <>
                     <ListFilter
                        key={facet.name}
                        facetName={facet.name}
                        multiple
                     />
                     <ClearButton onlyFacetNames={facet.name}>
                        clear
                     </ClearButton>
                  </>
               )}
            </Box>
         )}
      </Stack>
   );
}
