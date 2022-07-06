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
   Text,
   VStack,
} from '@chakra-ui/react';
import { Card } from '@components/ui';
import { cypressWindowLog } from '@helpers/test-helpers';
import { useLocalPreference } from '@ifixit/ui';
import { ProductSearchHit } from '@models/product-list';
import { WikiInfoEntry } from '@models/product-list/types';
import * as React from 'react';
import {
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
   wikiInfo: WikiInfoEntry[];
   title: string;
};

export function FilterableProductsSection(props: SectionProps) {
   const wikiInfo = props.wikiInfo;
   const title = props.title;
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
         <Heading as="h2" id="filterable-products-section-heading" srOnly>
            Products
         </Heading>
         <Toolbar
            viewType={viewType}
            onViewTypeChange={setViewType}
            wikiInfo={wikiInfo}
         />
         <CurrentRefinements />
         <HStack mt="4" align="flex-start" spacing={{ base: 0, md: 4 }}>
            <FacetCard>
               <FacetsAccordion wikiInfo={wikiInfo} title={title} />
            </FacetCard>
            <Card flex={1}>
               {isEmpty ? (
                  <ProductListEmptyState />
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

const ProductListEmptyState = () => {
   const clearRefinements = useClearRefinements();

   const currentRefinements = useCurrentRefinements();
   const hasRefinements = currentRefinements.items.length > 0;

   const searchBox = useSearchBox();
   const hasSearchQuery = searchBox.query.length > 0;

   const isFiltered = hasRefinements || hasSearchQuery;

   if (isFiltered) {
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
               Try adjusting your search or filter to find what you&apos;re
               looking for.
            </Text>
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
