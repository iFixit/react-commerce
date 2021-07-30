import { CollectionEmptyStateIllustration } from '@assets/svg';
import { HStack, Icon, Text, VStack } from '@chakra-ui/react';
import { Card } from '@components/Card';
import { useAtomicFilters, useHits, useSearch } from '@lib/algolia';
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

export enum CollectionState {
   Loading = 'loading',
   Empty = 'empty',
   Idle = 'idle',
   Filtered = 'filtered',
   NoResults = 'no-results',
}

function useCollectionState(): CollectionState {
   const { hits, isLoaded } = useHits<Hit>();
   const [query] = useSearch();
   const atomicFilters = useAtomicFilters();
   if (!isLoaded) {
      return CollectionState.Loading;
   }
   const isFiltered = atomicFilters.length > 0 || query.length > 0;
   console.log('isFiltered', isFiltered, atomicFilters, query.length);
   if (hits.length === 0) {
      if (isFiltered) {
         return CollectionState.NoResults;
      }
      return CollectionState.Empty;
   }
   if (isFiltered) {
      return CollectionState.Filtered;
   }
   return CollectionState.Idle;
}

export const FilterableProductSection = React.memo(() => {
   const { hits, isLoaded } = useHits<Hit>();
   const [productViewType, setProductViewType] = React.useState(
      ProductViewType.List
   );
   const [isFilterModalOpen, setIsFilterModalOpen] = React.useState(false);
   const collectionState = useCollectionState();

   React.useEffect(() => {
      console.log(collectionState);
   }, [collectionState]);

   if (collectionState === CollectionState.Empty) {
      return <CollectionEmptyState />;
   }

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
                  {collectionState === CollectionState.NoResults ? (
                     <ProductsEmptyState />
                  ) : productViewType === ProductViewType.List ? (
                     <ProductList>
                        {hits.map((hit) => {
                           return (
                              <ProductListItem key={hit.handle} product={hit} />
                           );
                        })}
                     </ProductList>
                  ) : (
                     <ProductGrid>
                        {hits.map((hit) => {
                           return (
                              <ProductGridItem key={hit.handle} product={hit} />
                           );
                        })}
                     </ProductGrid>
                  )}
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

const CollectionEmptyState = () => {
   return (
      <Card pt="16" pb="20">
         <VStack>
            <Icon
               as={CollectionEmptyStateIllustration}
               boxSize="200px"
               opacity="0.8"
            />
            <Text fontSize="lg" fontWeight="bold">
               Empty collection
            </Text>
            <Text maxW="500px" color="gray.500" textAlign="center">
               This collection does not have products. Try to navigate to
               subcategories to find what you are looking for.
            </Text>
         </VStack>
      </Card>
   );
};
