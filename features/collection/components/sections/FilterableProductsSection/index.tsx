import {
   CollectionEmptyStateIllustration,
   SearchEmptyStateIllustration,
} from '@assets/svg';
import { HStack, Icon, Skeleton, Text, VStack } from '@chakra-ui/react';
import { Card } from '@components/Card';
import { useHits, useSearchParams, useSearchState } from '@lib/algolia';
import { useUpdateUrlQuery } from '@lib/algolia-utils';
import * as React from 'react';
import { ProductHit } from '../../../types';
import { AppliedFilters } from './AppliedFilters';
import { CollectionPagination } from './CollectionPagination';
import { FilterList } from './FilterList';
import { FiltersModal } from './FiltersModal';
import { ProductGrid, ProductGridItem } from './ProductGrid';
import { ProductList, ProductListItem } from './ProductList';
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

export const FilterableProductsSection = React.memo(() => {
   const [productViewType, setProductViewType] = React.useState(
      ProductViewType.List
   );
   const [isFilterModalOpen, setIsFilterModalOpen] = React.useState(false);
   const hits = useHits<ProductHit>();
   const params = useSearchParams();
   const searchState = useSearchState();
   const isFiltered =
      params.filters.allIds.length > 0 || params.query.length > 0;
   const isEmptyCollection =
      (searchState === 'idle' || searchState === 'init') &&
      hits.length === 0 &&
      !isFiltered;
   const showNoResults =
      hits.length === 0 && (isFiltered || searchState === 'search');

   const productsContainerScrollRef = useScrollIntoViewEffect([hits]);

   useUpdateUrlQuery();

   if (isEmptyCollection) {
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
            <FilterCard isLoading={searchState === 'load'}>
               {searchState === 'load' ? (
                  <VStack align="stretch" px="4">
                     <Skeleton height="30px" />
                     <Skeleton height="30px" />
                     <Skeleton height="30px" />
                  </VStack>
               ) : (
                  <FilterList />
               )}
            </FilterCard>
            <VStack align="stretch" flex={1} spacing="0">
               <AppliedFilters pb="2" px={{ base: 4, sm: 0 }} />
               <Card
                  flex={1}
                  alignItems="center"
                  borderRadius={{ base: 'none', sm: 'lg' }}
               >
                  {searchState === 'load' ? (
                     <VStack w="full" align="stretch" p="4">
                        <SkeletonListItem />
                        <SkeletonListItem />
                        <SkeletonListItem />
                     </VStack>
                  ) : showNoResults ? (
                     <FilteredCollectionEmptyState />
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
      <Card pt="16" pb="20" borderRadius={{ base: 'none', sm: 'lg' }}>
         <VStack>
            <Icon
               as={CollectionEmptyStateIllustration}
               boxSize="200px"
               opacity="0.8"
            />
            <Text fontSize="lg" fontWeight="bold" w="full" textAlign="center">
               Empty collection
            </Text>
            <Text maxW="500px" color="gray.500" textAlign="center" px="2">
               This collection does not have products. Try to navigate to
               subcategories to find what you are looking for.
            </Text>
         </VStack>
      </Card>
   );
};

function FilteredCollectionEmptyState() {
   return (
      <VStack pt="16" pb="20">
         <Icon
            as={SearchEmptyStateIllustration}
            boxSize="200px"
            opacity="0.8"
         />
         <Text fontSize="lg" fontWeight="bold" w="full" textAlign="center">
            No results found
         </Text>
         <Text maxW="500px" color="gray.500" textAlign="center" px="2">
            Try adjusting your search or filter to find what you&apos;re looking
            for.
         </Text>
      </VStack>
   );
}

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
