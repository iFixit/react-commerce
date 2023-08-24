import { Box, Button, SimpleGrid, Text } from '@chakra-ui/react';
import { ProductListCard } from '@components/product-list/ProductListCard';
import { productListPath } from '@helpers/path-helpers';
import { Wrapper } from '@ifixit/ui';
import type { ProductList } from '@models/product-list';
import * as React from 'react';
import {
   useCurrentRefinements,
   useHits,
   useSearchBox,
} from 'react-instantsearch-hooks-web';
import { useDevicePartsItemType } from '../hooks/useDevicePartsItemType';

export type ProductListChildrenSectionProps = {
   productList: ProductList;
};

export function ProductListChildrenSection({
   productList,
}: ProductListChildrenSectionProps) {
   const { children: productListChildren, defaultShowAllChildrenOnLgSizes } =
      productList;

   const [showAll, setShowAll] = React.useState(false);

   const { items } = useCurrentRefinements();
   const { query } = useSearchBox();
   const { hits } = useHits();
   const itemType = useDevicePartsItemType(productList);

   const childrenCount = productListChildren.length;
   const isUnfilteredItemTypeWithNoHits = React.useMemo(() => {
      const nonItemTypeRefinements = items.filter(
         (item) => item.attribute !== 'facet_tags.Item Type'
      );
      return (
         !hits.length && itemType && !nonItemTypeRefinements.length && !query
      );
   }, [items, itemType, hits, query]);

   if (isUnfilteredItemTypeWithNoHits) return null;

   return (
      <Box as="section" id="product-list-children" my={{ base: 4, md: 6 }}>
         <Wrapper>
            <SimpleGrid
               data-testid="product-list-children"
               columns={{
                  base: 1,
                  sm: 2,
                  md: 3,
                  lg: 4,
                  xl: 5,
               }}
               spacing="2"
            >
               {productListChildren.map((child, index) => {
                  return (
                     <Box
                        key={child.handle}
                        display={computeChildVisibility(
                           index,
                           childrenCount,
                           showAll,
                           defaultShowAllChildrenOnLgSizes
                        )}
                     >
                        <ProductListCard
                           as="a"
                           href={productListPath({
                              deviceTitle: child.deviceTitle,
                              handle: child.handle,
                              type: child.type,
                           })}
                           productList={{
                              title: child.title,
                              imageUrl: child.image?.url,
                           }}
                        />
                     </Box>
                  );
               })}
               {!showAll && (
                  <Button
                     fontSize="sm"
                     backgroundColor="transparent"
                     transition="all 300ms"
                     outline="none"
                     overflow="hidden"
                     _focus={{
                        boxShadow: 'outline',
                     }}
                     _hover={{
                        borderColor: 'brand.300',
                        bgColor: 'brand.100',
                     }}
                     borderWidth="1px"
                     borderColor="gray.300"
                     borderRadius="base"
                     borderStyle="solid"
                     p="2"
                     color="gray.500"
                     display={computeButtonVisibility(
                        childrenCount,
                        defaultShowAllChildrenOnLgSizes
                     )}
                     justifyContent={{ base: 'center', sm: 'flex-start' }}
                     h="full"
                     onClick={() => setShowAll(true)}
                     fontWeight="semibold"
                  >
                     <Text
                        _before={{
                           color: 'gray.900',
                           content: {
                              base: `'+${childrenCount - 5} '`,
                              sm: `'+${childrenCount - 7} '`,
                              md: `'+${childrenCount - 8} '`,
                              lg: `'+${childrenCount - 7} '`,
                              xl: `'+${childrenCount - 9} '`,
                           },
                        }}
                     >
                        more
                     </Text>
                  </Button>
               )}
            </SimpleGrid>
         </Wrapper>
      </Box>
   );
}

const computeChildVisibility = (
   position: number,
   totalCount: number,
   isShowingMore: boolean,
   defaultShowAllChildrenOnLgSizes: boolean | null = false
) => {
   if (isShowingMore) {
      return 'block';
   }
   return {
      base: totalCount <= 5 ? 'block' : position < 5 ? 'block' : 'none',
      sm: totalCount <= 8 ? 'block' : position < 7 ? 'block' : 'none',
      md: totalCount <= 9 ? 'block' : position < 8 ? 'block' : 'none',
      lg:
         defaultShowAllChildrenOnLgSizes || totalCount <= 8 || position < 7
            ? 'block'
            : 'none',
      xl:
         defaultShowAllChildrenOnLgSizes || totalCount <= 10 || position < 9
            ? 'block'
            : 'none',
   };
};

const computeButtonVisibility = (
   totalCount: number,
   defaultShowAllChildrenOnLgSizes: boolean | null = false
) => {
   return {
      base: totalCount > 5 ? 'flex' : 'none',
      sm: totalCount > 8 ? 'flex' : 'none',
      md: totalCount > 9 ? 'flex' : 'none',
      lg: totalCount > 8 && !defaultShowAllChildrenOnLgSizes ? 'flex' : 'none',
      xl: totalCount > 10 && !defaultShowAllChildrenOnLgSizes ? 'flex' : 'none',
   };
};
