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
   Link,
   Text,
   VStack,
} from '@chakra-ui/react';
import { Card } from '@components/ui';
import { IFIXIT_ORIGIN } from '@config/env';
import { getProductListTitle } from '@helpers/product-list-helpers';
import { cypressWindowLog } from '@helpers/test-helpers';
import { useLocalPreference } from '@ifixit/ui';
import {
   ProductList as TProductList,
   ProductListType,
   ProductSearchHit,
} from '@models/product-list';
import * as React from 'react';
import {
   Configure,
   useClearRefinements,
   useCurrentRefinements,
   useHits,
   useSearchBox,
} from 'react-instantsearch-hooks-web';
import { CurrentRefinements } from './CurrentRefinements';
import { FacetsAccordion } from './FacetsAccordion';
import { Pagination } from './Pagination';
import { ProductGrid, ProductGridItem } from './ProductGrid';
import { ProductList, ProductListItem } from './ProductList';
import { ProductViewType, Toolbar } from './Toolbar';

const PRODUCT_VIEW_TYPE_STORAGE_KEY = 'productViewType';

type SectionProps = {
   productList: TProductList;
};

export function FilterableProductsSection({ productList }: SectionProps) {
   const { hits } = useHits<ProductSearchHit>();
   const [viewType, setViewType] = useLocalPreference(
      PRODUCT_VIEW_TYPE_STORAGE_KEY,
      ProductViewType.List
   );

   cypressWindowLog({ filteredProducts: hits });

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
         {productList.type === ProductListType.DeviceItemTypeParts && (
            <Configure
               filters={`'facet_tags.Item Type': ${JSON.stringify(
                  productList.itemType
               )}`}
            />
         )}
         <Heading as="h2" id="filterable-products-section-heading" srOnly>
            Products
         </Heading>
         <Toolbar
            viewType={viewType}
            productList={productList}
            onViewTypeChange={setViewType}
         />
         <CurrentRefinements />
         <HStack mt="4" align="flex-start" spacing={{ base: 0, md: 4 }}>
            <FacetCard>
               <FacetsAccordion productList={productList} />
            </FacetCard>
            <Card flex={1}>
               {isEmpty ? (
                  <ProductListEmptyState productList={productList} />
               ) : viewType === ProductViewType.Grid ? (
                  <>
                     <ProductGrid>
                        {hits.map((hit) => {
                           return (
                              <ProductGridItem key={hit.handle} product={hit} />
                           );
                        })}
                     </ProductGrid>
                     <Pagination />
                  </>
               ) : (
                  <>
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
                     <Pagination />
                  </>
               )}
            </Card>
         </HStack>
      </Flex>
   );
}

type FacetCardProps = React.PropsWithChildren<{}>;

function FacetCard({ children }: FacetCardProps) {
   return (
      <Card
         py="1.5"
         px="3"
         w="250px"
         boxShadow="md"
         maxH="calc(100vh - var(--chakra-space-4) * 2)"
         overflow="auto"
         display={{
            base: 'none',
            md: 'block',
         }}
         position="sticky"
         top="4"
      >
         {children}
      </Card>
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

type EmptyStateProps = {
   productList: TProductList;
};

const ProductListEmptyState = ({ productList }: EmptyStateProps) => {
   const clearRefinements = useClearRefinements();

   const currentRefinements = useCurrentRefinements();
   const hasRefinements = currentRefinements.items.length > 0;

   const searchBox = useSearchBox();
   const hasSearchQuery = searchBox.query.length > 0;

   const isFiltered = hasRefinements || hasSearchQuery;

   const title = getProductListTitle(productList);
   const encodedQuery = encodeURIComponent(searchBox.query);

   if (isFiltered) {
      return (
         <VStack pt="16" pb="20" px="2" textAlign="center">
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
               href={`${IFIXIT_ORIGIN}/Search?query=${encodedQuery}`}
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
                     searchBox.clear();
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
