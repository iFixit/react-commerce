import { HStack, VStack } from '@chakra-ui/react';
import { Card } from '@components/Card';
import {
   CollectionFilters,
   CollectionPagination,
   CollectionProducts,
   FiltersModal,
   NumberOfHits,
   OpenFiltersButton,
   ProductViewGridButton,
   ProductViewListButton,
   ProductViewSwitch,
   ProductViewType,
   SearchInput,
   SortBySelect,
   Toolbar,
} from '@features/collection/components';
import * as React from 'react';
import { AppliedFilters } from './AppliedFilters';

export const FilterableProductSection = React.memo(() => {
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
               <AppliedFilters />
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
