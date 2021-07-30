import { CollectionEmptyStateIllustration } from '@assets/svg';
import { HStack, Icon, Text, VStack } from '@chakra-ui/react';
import { Card } from '@components/Card';
import { useHits } from '@lib/algolia';
import * as React from 'react';
import { Hit } from '../types';
import { AppliedFilters } from './AppliedFilters';
import { CollectionFilters } from './CollectionFilters';
import { CollectionPagination } from './CollectionPagination';
import { FiltersModal } from './FiltersModal';
import { ProductGrid, ProductGridItem } from './ProductGrid';
import { ProductList, ProductListItem } from './ProductList';
import { ProductsEmptyState } from './ProductsEmptyState';
import { SearchInput } from './SearchInput';
import {
   NumberOfHits,
   OpenFiltersButton,
   ProductViewGridButton,
   ProductViewListButton,
   ProductViewSwitch,
   SortBySelect,
   Toolbar,
} from './Toolbar';

export enum ProductViewType {
   Grid = 'grid',
   List = 'list',
}

export const FilterableProductSection = React.memo(() => {
   const { hits, isLoaded } = useHits<Hit>();
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
         {isLoaded && hits.length === 0 ? (
            <EmptyState />
         ) : (
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
                     {hits.length === 0 ? (
                        <ProductsEmptyState />
                     ) : productViewType === ProductViewType.List ? (
                        <ProductList>
                           {hits.map((hit) => {
                              return (
                                 <ProductListItem
                                    key={hit.handle}
                                    product={hit}
                                 />
                              );
                           })}
                        </ProductList>
                     ) : (
                        <ProductGrid>
                           {hits.map((hit) => {
                              return (
                                 <ProductGridItem
                                    key={hit.handle}
                                    product={hit}
                                 />
                              );
                           })}
                        </ProductGrid>
                     )}
                     <CollectionPagination />
                  </Card>
               </VStack>
            </HStack>
         )}
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

const EmptyState = () => {
   return (
      <Card p="4">
         <VStack>
            <Icon as={CollectionEmptyStateIllustration} boxSize="300px" />
            <Text color="gray.500" fontSize="2xl">
               Empty collection
            </Text>
         </VStack>
      </Card>
   );
};
