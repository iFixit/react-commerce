import {
   Button,
   Collapse,
   HStack,
   Tag,
   TagCloseButton,
   TagLabel,
   VStack,
   Wrap,
   WrapItem,
} from '@chakra-ui/react';
import { Card } from '@components/Card';
import {
   CollectionFilters,
   CollectionPagination,
   CollectionProducts,
   Toolbar,
   ProductViewType,
   NumberOfHits,
   FiltersModal,
   OpenFiltersButton,
   SortBySelect,
   SearchInput,
   ProductViewSwitch,
   ProductViewListButton,
   ProductViewGridButton,
} from '@features/collection/components';
import { formatFacetName } from '@features/collection/utils';
import {
   AtomicFilter,
   useAtomicFilters,
   useClearFilter,
   useSearchStateContext,
} from '@lib/algolia';
import { assertNever } from '@lib/utils';
import * as React from 'react';

export const FilterableProductView = React.memo(() => {
   const [productViewType, setProductViewType] = React.useState(
      ProductViewType.List
   );
   const [isFilterModalOpen, setIsFilterModalOpen] = React.useState(false);

   return (
      <VStack align="stretch" mb="4" spacing="4">
         <Toolbar
            leftContent={<NumberOfHits />}
            rightContent={
               <HStack px={{ base: 4, sm: 0 }}>
                  <FiltersModal
                     isOpen={isFilterModalOpen}
                     onClose={() => setIsFilterModalOpen(false)}
                  />
                  <VStack w="full" align="stretch" spacing={{ base: 2, md: 0 }}>
                     <HStack>
                        <OpenFiltersButton
                           onClick={() => setIsFilterModalOpen(true)}
                        >
                           Filters
                        </OpenFiltersButton>
                        <SortBySelect
                           defaultValue="manual"
                           placeholder="Select collection sort by"
                        >
                           <option value="manual">Featured</option>
                           <option value="best-selling">Most popular</option>
                        </SortBySelect>
                     </HStack>
                     <SearchInput maxW={{ md: 300 }} />
                  </VStack>
                  <ProductViewSwitch>
                     <ProductViewListButton
                        aria-label="Select list view"
                        isActive={productViewType === ProductViewType.List}
                        onClick={() => setProductViewType(ProductViewType.List)}
                     />
                     <ProductViewGridButton
                        aria-label="Select grid view"
                        isActive={productViewType === ProductViewType.Grid}
                        onClick={() => setProductViewType(ProductViewType.Grid)}
                     />
                  </ProductViewSwitch>
               </HStack>
            }
         />
         <HStack align="flex-start" spacing={{ base: 0, md: 4 }}>
            <FilterCard>
               <CollectionFilters />
            </FilterCard>
            <VStack align="stretch" flex={1}>
               <AppliedFilterSection />
               <Card
                  flex={1}
                  alignItems="center"
                  borderRadius={{ base: 'none', sm: 'lg' }}
               >
                  <CollectionProducts viewType={productViewType} />
                  <CollectionPagination />
               </Card>
            </VStack>
         </HStack>
      </VStack>
   );
});

const FilterCard = ({ children }: React.PropsWithChildren<unknown>) => {
   return (
      <Card
         py="6"
         width="250px"
         display={{ base: 'none', md: 'block' }}
         position="sticky"
         top="4"
         h="calc(100vh - var(--chakra-space-4) * 2)"
         flexShrink={0}
      >
         {children}
      </Card>
   );
};

const AppliedFilterSection = () => {
   const atomicFilters = useAtomicFilters();
   const clear = useClearFilter();
   const clearAllFilters = React.useCallback(() => {
      clear();
   }, [clear]);
   return (
      <Collapse in={atomicFilters.length > 0} animateOpacity unmountOnExit>
         <Wrap w="full" align="center">
            {atomicFilters.map((filter) => {
               return (
                  <WrapItem key={filter.id}>
                     <FilterTag filter={filter} />
                  </WrapItem>
               );
            })}
            <WrapItem>
               <Button
                  variant="link"
                  size="sm"
                  colorScheme="brand"
                  onClick={clearAllFilters}
               >
                  Clear All
               </Button>
            </WrapItem>
         </Wrap>
      </Collapse>
   );
};

interface FilterTagProps {
   filter: AtomicFilter;
}

const FilterTag = ({ filter }: FilterTagProps) => {
   const state = useSearchStateContext();
   const clear = useClearFilter();
   const valuesById = state.facetValues.byId;

   const value = React.useMemo(() => {
      const facetName = formatFacetName(filter.facetName);
      switch (filter.type) {
         case 'basic': {
            return `${facetName}: ${valuesById[filter.valueId].value}`;
         }
         case 'numeric-comparison': {
            return `${facetName}: ${filter.operator} ${filter.value}`;
         }
         case 'numeric-range': {
            return `${facetName}: ${filter.range.min} - ${filter.range.max}`;
         }
         default:
            return assertNever(filter);
      }
   }, [filter, valuesById]);

   const clearFilter = React.useCallback(() => {
      clear(filter.id);
   }, [clear, filter.id]);

   return (
      <Tag size="md" variant="outline" colorScheme="brand">
         <TagLabel>{value}</TagLabel>
         <TagCloseButton onClick={clearFilter} />
      </Tag>
   );
};
