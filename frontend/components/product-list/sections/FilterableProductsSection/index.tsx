import {
   ProductListEmptyStateIllustration,
   SearchEmptyStateIllustration,
} from '@assets/svg';
import {
   Box,
   Button,
   Flex,
   Heading,
   HStack,
   Icon,
   Skeleton,
   Text,
   VStack,
} from '@chakra-ui/react';
import { Card } from '@components/ui';
import { useUpdateUrlQuery } from '@helpers/algolia-helpers';
import {
   useClearSearchParams,
   useHits,
   useSearchParams,
   useSearchState,
} from '@lib/algolia';
import { ProductSearchHit } from '@models/product-list';
import * as React from 'react';
import { AppliedFilters } from './AppliedFilters';
import { ProductListFilters } from './ProductListFilters';
import { FiltersModal } from './FiltersModal';
import { ProductGrid, ProductGridItem } from './ProductGrid';
import { ProductList, ProductListItem } from './ProductList';
import { ProductListPagination } from './ProductListPagination';
import { SearchInput } from './SearchInput';
import {
   NumberOfHits,
   OpenFiltersButton,
   ProductViewGridButton,
   ProductViewListButton,
   ProductViewSwitch,
   Toolbar,
} from './Toolbar';
import { cypressWindowLog } from '@helpers/test-helpers';

export enum ProductViewType {
   Grid = 'grid',
   List = 'list',
}

export const FilterableProductsSection = React.memo(() => {
   const [productViewType, setProductViewType] = React.useState(
      ProductViewType.List
   );
   const [isFilterModalOpen, setIsFilterModalOpen] = React.useState(false);
   const hits = useHits<ProductSearchHit>();

   cypressWindowLog({ filteredProducts: hits });

   const params = useSearchParams();
   const searchState = useSearchState();
   const isFiltered =
      params.filters.allIds.length > 0 || params.query.length > 0;
   const isEmptyProductList =
      (searchState === 'idle' || searchState === 'init') &&
      hits.length === 0 &&
      !isFiltered;
   const showNoResults =
      hits.length === 0 && (isFiltered || searchState === 'search');

   const productsContainerScrollRef = useScrollIntoViewEffect([hits]);

   useUpdateUrlQuery();

   if (isEmptyProductList) {
      return <ProductListEmptyState />;
   }
   return (
      <Flex
         as="section"
         direction="column"
         align="stretch"
         mb="4"
         ref={productsContainerScrollRef}
         data-testid="filterable-products-section"
         data-search-state={searchState}
         aria-labelledby="filterable-products-section-heading"
      >
         <Heading
            as="h2"
            id="filterable-products-section-heading"
            // This is heading is only for screen readers
            position="absolute"
            w="1px"
            h="1px"
            p="0"
            m="-1px"
            overflow="hidden"
            sx={{
               clip: 'rect(0,0,0,0)',
            }}
            whiteSpace="nowrap"
            borderWidth="0"
         >
            Products
         </Heading>
         <Toolbar
            leftContent={<NumberOfHits />}
            rightContent={
               <HStack px={{ base: 6, sm: 0 }}>
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
                        <ProductViewSwitch
                           display={{
                              base: 'flex',
                              md: 'none',
                           }}
                        >
                           <ProductViewListButton
                              aria-label="Select list view"
                              isActive={
                                 productViewType === ProductViewType.List
                              }
                              onClick={() =>
                                 setProductViewType(ProductViewType.List)
                              }
                           />
                           <ProductViewGridButton
                              aria-label="Select grid view"
                              isActive={
                                 productViewType === ProductViewType.Grid
                              }
                              onClick={() =>
                                 setProductViewType(ProductViewType.Grid)
                              }
                           />
                        </ProductViewSwitch>
                     </HStack>
                     <SearchInput maxW={{ md: 300 }} />
                  </VStack>
                  <ProductViewSwitch
                     display={{
                        base: 'none',
                        md: 'flex',
                     }}
                  >
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
         <HStack align="flex-start" mt="4" spacing={{ base: 0, md: 4 }}>
            <FilterCard isLoading={searchState === 'load'}>
               {searchState === 'load' ? (
                  <VStack align="stretch" px="4">
                     <Skeleton height="30px" />
                     <Skeleton height="30px" />
                     <Skeleton height="30px" />
                  </VStack>
               ) : (
                  <ProductListFilters />
               )}
            </FilterCard>
            <VStack align="stretch" flex={1} spacing="0">
               <AppliedFilters pb="2" px={{ base: 4, sm: 0 }} />
               <Card
                  flex={1}
                  alignItems="center"
                  borderRadius={{ base: 'none', sm: 'lg' }}
                  overflow="hidden"
               >
                  {searchState === 'load' ? (
                     <VStack w="full" align="stretch" p="4">
                        <SkeletonListItem />
                        <SkeletonListItem />
                        <SkeletonListItem />
                     </VStack>
                  ) : searchState === 'error' ? (
                     <SearchErrorState />
                  ) : showNoResults ? (
                     <FilteredProductListEmptyState />
                  ) : productViewType === ProductViewType.List ? (
                     <>
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
                        <ProductListPagination />
                     </>
                  ) : (
                     <>
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
                        <ProductListPagination />
                     </>
                  )}
               </Card>
            </VStack>
         </HStack>
      </Flex>
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

const ProductListEmptyState = () => {
   return (
      <Card pt="16" pb="20" borderRadius={{ base: 'none', sm: 'lg' }}>
         <VStack>
            <Icon
               as={ProductListEmptyStateIllustration}
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

function FilteredProductListEmptyState() {
   const clearSearchParams = useClearSearchParams();
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
         <Box pt="8">
            <Button colorScheme="brand" onClick={() => clearSearchParams()}>
               Reset filters
            </Button>
         </Box>
      </VStack>
   );
}

function SearchErrorState() {
   const clearSearchParams = useClearSearchParams();
   const searchParams = useSearchParams();

   const isFiltered =
      searchParams.query.length > 0 || searchParams.filters.allIds.length > 0;

   return (
      <VStack pt="16" pb="20">
         <Icon
            as={SearchEmptyStateIllustration}
            boxSize="200px"
            opacity="0.8"
         />
         <Text fontSize="lg" fontWeight="bold" w="full" textAlign="center">
            Oops, an error occurred!
         </Text>
         {isFiltered ? (
            <Text maxW="500px" color="gray.500" textAlign="center" px="2">
               Try adjusting your search or filter to find what you&apos;re
               looking for.
            </Text>
         ) : (
            <Text maxW="500px" color="gray.500" textAlign="center" px="2">
               Check your Internet connection and try to reload the page
            </Text>
         )}
         <Box pt="8">
            {isFiltered ? (
               <Button colorScheme="brand" onClick={() => clearSearchParams()}>
                  Reset filters
               </Button>
            ) : (
               <Button colorScheme="brand" onClick={reloadPage}>
                  Reload page
               </Button>
            )}
         </Box>
      </VStack>
   );
}

function reloadPage() {
   window.location.reload();
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
