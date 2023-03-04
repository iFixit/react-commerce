import {
   ProductListEmptyStateIllustration,
   SearchEmptyStateIllustration,
} from '@assets/svg/files';
import {
   Box,
   BoxProps,
   Button,
   Collapse,
   Divider,
   Flex,
   forwardRef,
   Heading,
   Icon,
   Link,
   Text,
   VStack,
} from '@chakra-ui/react';
import { Card } from '@components/ui';
import { productListPath } from '@helpers/path-helpers';
import { getProductListTitle } from '@helpers/product-list-helpers';
import { useAppContext } from '@ifixit/app';
import { useLocalPreference } from '@ifixit/ui';
import {
   ProductList as TProductList,
   ProductSearchHit,
} from '@models/product-list';
import * as React from 'react';
import {
   useClearRefinements,
   useCurrentRefinements,
   useHits,
   useSearchBox,
} from 'react-instantsearch-hooks-web';
import { useDevicePartsItemType } from '../../hooks/useDevicePartsItemType';
import { CurrentRefinements } from './CurrentRefinements';
import { FacetsAccordion } from './facets/accordion';
import { Pagination } from './Pagination';
import { ProductGrid, ProductGridItem } from './ProductGrid';
import { ProductList, ProductListItem } from './ProductList';
import { ProductViewType, Toolbar } from './Toolbar';
import {
   SearchQueryProvider,
   useSearchQueryContext,
} from '@templates/product-list/hooks/useSearchQuery';

const PRODUCT_VIEW_TYPE_STORAGE_KEY = 'productViewType';

type SectionProps = {
   productList: TProductList;
};

export function FilterableProductsSection({ productList }: SectionProps) {
   const { hits } = useHits<ProductSearchHit>();
   const currentRefinements = useCurrentRefinements();
   const [viewType, setViewType] = useLocalPreference(
      PRODUCT_VIEW_TYPE_STORAGE_KEY,
      ProductViewType.List
   );

   const productsContainerScrollRef = useScrollIntoViewEffect([hits]);

   const isEmpty = hits.length === 0;

   return (
      <Flex
         ref={productsContainerScrollRef}
         as="section"
         direction="column"
         align="stretch"
         mb="4"
         data-testid="filterable-products-section"
         aria-labelledby="filterable-products-section-heading"
      >
         <Heading as="h2" id="filterable-products-section-heading" srOnly>
            Products
         </Heading>

         <SearchQueryProvider>
            <Flex align="flex-start">
               <Flex
                  bg="white"
                  borderWidth="1px"
                  borderStyle="solid"
                  borderColor="gray.300"
                  borderRadius="base"
                  px="3"
                  py="1.5"
                  mr="4"
                  w="64"
                  maxH="calc(100vh - var(--chakra-space-4) * 2)"
                  overflow="auto"
                  display={{
                     base: 'none',
                     md: 'block',
                  }}
                  position="sticky"
                  top="4"
                  flexGrow="0"
               >
                  <Collapse
                     in={currentRefinements.items.length > 0}
                     animateOpacity
                     data-testid="current-refinements"
                  >
                     <Flex mt="1.5" mb="3" wrap="wrap" align="flex-start">
                        <CurrentRefinements />
                     </Flex>
                     <Divider borderColor="gray.300" opacity="1" />
                  </Collapse>
                  <FacetsAccordion productList={productList} />
               </Flex>
               <Flex direction="column" flex="1">
                  <Toolbar
                     viewType={viewType}
                     productList={productList}
                     onViewTypeChange={setViewType}
                  />
                  <Flex
                     bg="white"
                     direction="column"
                     mt="2"
                     overflow="hidden"
                     borderWidth="1px"
                     borderStyle="solid"
                     borderColor="gray.300"
                     borderRadius="base"
                  >
                     <ProductListEmptyState
                        productList={productList}
                        hidden={!isEmpty}
                     />
                     {!isEmpty && viewType === ProductViewType.Grid && (
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
                     {!isEmpty && viewType === ProductViewType.List && (
                        <ProductList>
                           {hits.map((hit) => {
                              return (
                                 <ProductListItem
                                    key={hit.objectID}
                                    product={hit}
                                 />
                              );
                           })}
                        </ProductList>
                     )}
                     <Pagination />
                  </Flex>
               </Flex>
            </Flex>
         </SearchQueryProvider>
      </Flex>
   );
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

type EmptyStateProps = BoxProps & {
   productList: TProductList;
};

const ProductListEmptyState = forwardRef<EmptyStateProps, 'div'>(
   ({ productList, ...otherProps }, ref) => {
      const { setSearchQuery } = useSearchQueryContext();
      const clearRefinements = useClearRefinements({ excludedAttributes: [] });

      const currentRefinements = useCurrentRefinements();
      const hasRefinements = currentRefinements.items.length > 0;

      const searchBox = useSearchBox();
      const hasSearchQuery = searchBox.query.length > 0;

      const isFiltered = hasRefinements || hasSearchQuery;

      const itemType = useDevicePartsItemType(productList);
      const title = getProductListTitle(productList, itemType);
      const encodedQuery = encodeURIComponent(searchBox.query);

      const ancestors = productList.ancestors;
      const parentCategory = ancestors[ancestors.length - 1];

      const appContext = useAppContext();

      if (isFiltered) {
         return (
            <VStack
               ref={ref}
               pt="16"
               pb="20"
               px="2"
               textAlign="center"
               {...otherProps}
               data-testid="product-list-no-results"
            >
               <Icon
                  as={SearchEmptyStateIllustration}
                  boxSize="200px"
                  opacity="0.8"
               />
               <Text fontSize="lg" fontWeight="bold" w="full">
                  No matching products found in {title}
               </Text>
               <Text maxW="500px" color="gray.500">
                  Try adjusting your search or filter to find what you&apos;re
                  looking for.
               </Text>
               <Link
                  maxW="500px"
                  color="brand.500"
                  href={`${appContext.ifixitOrigin}/Search?query=${encodedQuery}`}
               >
                  Search all of iFixit for&nbsp;
                  <Text as="span" fontWeight="bold">
                     {searchBox.query}
                  </Text>
               </Link>
               <Box pt="8">
                  <Button
                     colorScheme="brand"
                     onClick={() => {
                        setSearchQuery('');
                        clearRefinements.refine();
                     }}
                  >
                     Reset filters
                  </Button>
               </Box>
            </VStack>
         );
      }
      return (
         <Card
            ref={ref}
            pt="16"
            pb="20"
            borderRadius={{ base: 'none', sm: 'lg' }}
            sx={{
               a: {
                  color: 'brand.500',
                  transition: 'color 300ms',
                  '&:hover': {
                     color: 'brand.600',
                  },
               },
            }}
            {...otherProps}
         >
            <VStack>
               <Icon
                  as={ProductListEmptyStateIllustration}
                  boxSize="200px"
                  opacity="0.8"
               />
               <Text
                  fontSize="lg"
                  fontWeight="bold"
                  w="full"
                  textAlign="center"
               >
                  Empty collection
               </Text>
               <Text maxW="500px" color="gray.500" textAlign="center" px="2">
                  This collection does not have products.
               </Text>
               {parentCategory && (
                  <Link href={productListPath(parentCategory)}>
                     Return to {parentCategory.title}
                  </Link>
               )}
            </VStack>
         </Card>
      );
   }
);
