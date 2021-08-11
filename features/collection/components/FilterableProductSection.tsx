import { CollectionEmptyStateIllustration } from '@assets/svg';
import { HStack, Icon, Skeleton, Text, VStack } from '@chakra-ui/react';
import { Card } from '@components/Card';
import { useAtomicFilters, useHits, useSearch } from '@lib/algolia';
import * as React from 'react';
import { Hit } from '../types';
import { AppliedFilters } from './AppliedFilters';
import { CollectionPagination } from './CollectionPagination';
import { FilterList } from './FilterList';
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

export const FilterableProductSection = React.memo(() => {
   const { hits } = useHits<Hit>();
   const [productViewType, setProductViewType] = React.useState(
      ProductViewType.List
   );
   const [isFilterModalOpen, setIsFilterModalOpen] = React.useState(false);
   const collectionState = useCollectionState();

   const productsContainerScrollRef = useScrollIntoViewEffect([hits]);

   if (collectionState === CollectionState.Empty) {
      return <CollectionEmptyState />;
   }

   return (
      <VStack
         align="stretch"
         mb="4"
         spacing="4"
         ref={productsContainerScrollRef}
      >
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
            <FilterCard isLoading={collectionState === CollectionState.Loading}>
               {collectionState === CollectionState.Loading ? (
                  <VStack align="stretch" px="4">
                     <Skeleton height="30px" />
                     <Skeleton height="30px" />
                     <Skeleton height="30px" />
                  </VStack>
               ) : (
                  <FilterList />
               )}
            </FilterCard>
            <VStack align="stretch" flex={1}>
               <AppliedFilters />
               <Card
                  flex={1}
                  alignItems="center"
                  borderRadius={{ base: 'none', sm: 'lg' }}
               >
                  {collectionState === CollectionState.Loading ? (
                     <VStack w="full" align="stretch" p="4">
                        <SkeletonListItem />
                        <SkeletonListItem />
                        <SkeletonListItem />
                     </VStack>
                  ) : collectionState === CollectionState.NoResults ? (
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
                  {[CollectionState.Idle, CollectionState.Filtered].includes(
                     collectionState
                  ) && <CollectionPagination />}
               </Card>
            </VStack>
         </HStack>
      </VStack>
   );
});

function useCollectionState(): CollectionState {
   const { hits, isLoaded } = useHits<Hit>();
   const [query] = useSearch();
   const atomicFilters = useAtomicFilters();
   if (!isLoaded) {
      return CollectionState.Loading;
   }
   const isFiltered = atomicFilters.length > 0 || query.length > 0;
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

function useScrollIntoViewEffect(deps: React.DependencyList) {
   const ref = React.useRef<HTMLDivElement>(null);
   React.useEffect(() => {
      if (ref.current && ref.current.getBoundingClientRect().top < 0) {
         ref.current.scrollIntoView({
            behavior: 'smooth',
         });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, deps);
   return ref;
}

const FilterCard = ({
   children,
   isLoading,
}: React.PropsWithChildren<{ isLoading: boolean }>) => {
   return (
      <Card
         py="6"
         width="250px"
         display={{ base: 'none', md: 'block' }}
         position="sticky"
         top="4"
         h={isLoading ? undefined : 'calc(100vh - var(--chakra-space-4) * 2)'}
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

const SkeletonListItem = () => {
   return (
      <HStack align="flex-start">
         <Skeleton
            flexGrow={0}
            height="120px"
            width="160px"
            border="1px solid green"
         />
         <VStack flexGrow={1} align="stretch">
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
         </VStack>
      </HStack>
   );
};
