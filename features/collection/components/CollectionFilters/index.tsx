import {
   Accordion,
   AccordionButton,
   AccordionIcon,
   AccordionItem,
   AccordionPanel,
   Box,
   chakra,
   Collapse,
   Divider,
   Stack,
   useDisclosure,
   VStack,
} from '@chakra-ui/react';
import { Facet, FacetValueState, useFacets } from '@lib/algolia';
import { capitalize } from '@lib/utils';
import React from 'react';
import { ClearButton } from './ClearButton';
import { ListFilter } from './ListFilter';
import { RangeFilter, RangeFilterInput, RangeFilterList } from './RangeFilter';
import {
   VariableSizeList,
   VariableSizeListProps,
   ListChildComponentProps,
} from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import {
   MeasuredContentProvider,
   useMeasureContent,
   useMeasuredContentContext,
} from './MeasuredContent';

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

      return (
         <MeasuredContentProvider>
            <Sizer>
               {({ height, width }) => {
                  // console.log({ width, height });
                  return (
                     <FilterList
                        height={height}
                        itemCount={filteredFacets.length}
                        estimatedItemSize={40}
                        width={width}
                        itemData={filteredFacets}
                     >
                        {({ data, index, style }) => {
                           return (
                              <Box style={style}>
                                 <ListItem data={data} index={index} />
                              </Box>
                           );
                        }}
                     </FilterList>
                  );
               }}
            </Sizer>
         </MeasuredContentProvider>
      );
   }
);

function FilterList(props: Omit<VariableSizeListProps, 'itemSize'>) {
   const { listRef, getSize } = useMeasuredContentContext();

   return <VariableSizeList ref={listRef} {...props} itemSize={getSize} />;
}

function filterFacet(facet: Facet): boolean {
   return !FACET_BLOCKLIST.includes(facet.name) && facet.values.length > 1;
}

function formatFacetName(facetName: string): string {
   let name = facetName;
   if (name.startsWith('options.')) {
      name = name.replace('options.', '');
   }
   if (name.startsWith('named_tags.')) {
      name = name.replace('named_tags.', '');
   }
   name = name.replace(/_/g, ' ');
   name = capitalize(name);
   return name;
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
   data: Facet[];
   index: number;
}

function ListItem({ data, index }: ListItemProps) {
   const facet = React.useMemo(() => {
      return data[index];
   }, [data, index]);
   const name = formatFacetName(facet.name);
   const { ref, reset } = useMeasureContent<HTMLDivElement>(index);
   const { isOpen, onToggle } = useDisclosure();

   React.useEffect(() => {
      reset();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [isOpen]);

   return (
      <Stack ref={ref} spacing={2}>
         <Box>
            <Box
               as="button"
               fontWeight="semibold"
               onClick={onToggle}
               py="2"
               w="full"
            >
               <Box flex="1" textAlign="left">
                  {name}
               </Box>
            </Box>
            <Divider />
         </Box>
         {/* <Collapse in={isOpen} animateOpacity unmountOnExit> */}
         {isOpen && (
            <Box pb="8">
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
         {/* </Collapse> */}
      </Stack>
   );
}

interface WindowSize {
   width: number;
   height: number;
}

function useWindowSize() {
   const [size, setSize] = React.useState<WindowSize>({ width: 0, height: 0 });
   React.useEffect(() => {
      setSize({
         width: window.innerWidth,
         height: window.innerHeight,
      });
   }, []);
   return size;
}
