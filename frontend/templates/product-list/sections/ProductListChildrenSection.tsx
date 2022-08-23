import {
   Box,
   Button,
   chakra,
   Divider,
   Flex,
   Heading,
   SimpleGrid,
   Text,
} from '@chakra-ui/react';
import { IfixitImage } from '@components/ifixit-image';
import { ProductList } from '@models/product-list';
import NextLink from 'next/link';
import * as React from 'react';
import { useCurrentRefinements, useHits } from 'react-instantsearch-hooks-web';
import { useDevicePartsItemType } from './FilterableProductsSection/useDevicePartsItemType';

export type ProductListChildrenSectionProps = {
   productList: ProductList;
};

export function ProductListChildrenSection({
   productList,
}: ProductListChildrenSectionProps) {
   const {
      deviceTitle,
      childrenHeading,
      children: productListChildren,
   } = productList;
   const [isShowingMore, setShowingMore] = React.useState(false);

   const gridRef = React.useRef<HTMLDivElement>(null);
   const maskMaxHeight = React.useMemo(
      () =>
         computeMaskMaxHeight(
            60,
            16,
            isShowingMore,
            gridRef.current?.clientHeight
         ),
      [isShowingMore]
   );

   const showMoreVisibility = React.useMemo(
      () => computeShowMoreVisibility(productListChildren.length),
      [productListChildren]
   );

   const onToggle = React.useCallback(() => {
      setShowingMore((current) => !current);
   }, []);

   let heading = 'Choose a model';
   if (childrenHeading && childrenHeading.length > 0) {
      heading = childrenHeading;
   } else if (deviceTitle && deviceTitle.length > 0) {
      heading = `Choose a model of ${deviceTitle}`;
   }

   const { items } = useCurrentRefinements();
   const { hits } = useHits();
   const itemType = useDevicePartsItemType(productList);
   const isUnfilteredItemTypeWithNoHits = React.useMemo(() => {
      const nonItemTypeRefinements = items.filter(
         (item) => item.attribute !== 'facet_tags.Item Type'
      );
      return !hits.length && itemType && !nonItemTypeRefinements.length;
   }, [items, itemType, hits]);

   return isUnfilteredItemTypeWithNoHits ? null : (
      <Box
         px={{
            base: 6,
            sm: 0,
         }}
      >
         <Text fontSize="lg" fontWeight="bold" mb="4">
            {heading}
         </Text>
         <Box
            mx={-1}
            px={1}
            pb={1}
            maxH={maskMaxHeight}
            overflowY="hidden"
            transition="all 300ms"
         >
            <SimpleGrid
               ref={gridRef}
               data-testid="product-list-devices"
               columns={{
                  base: 1,
                  sm: 2,
                  md: 3,
                  lg: 4,
               }}
               spacing="3"
               pt={1}
            >
               {productListChildren.map((child) => {
                  return <ChildLink key={child.handle} child={child} />;
               })}
            </SimpleGrid>
         </Box>
         <Box mt="2" display={showMoreVisibility}>
            <Button
               variant="link"
               size="sm"
               onClick={onToggle}
               mt="1"
               pl="2"
               pr="2"
               py="1"
               ml="-8px"
               display="block"
            >
               {isShowingMore ? 'Show less' : 'Show more'}
            </Button>
         </Box>
      </Box>
   );
}

interface ChildLinkProps {
   child: ProductList['children'][0];
}

const ChildLink = ({ child }: ChildLinkProps) => {
   return (
      <NextLink href={child.path} passHref>
         <chakra.a
            bg="white"
            borderRadius="lg"
            boxShadow="base"
            _hover={{
               boxShadow: 'md',
            }}
            transition="all 300ms"
            outline="none"
            overflow="hidden"
            height="60px"
            _focus={{
               boxShadow: 'outline',
            }}
         >
            <Flex
               h="full"
               direction="row"
               align="center"
               justifyContent="center"
               minH="inherit"
            >
               {child.image && (
                  <>
                     <Flex
                        align="center"
                        justify="center"
                        flexBasis="80px"
                        h="60px"
                        flexGrow={0}
                        flexShrink={0}
                        position="relative"
                     >
                        <IfixitImage
                           src={child.image.url}
                           alt={child.image.alternativeText ?? ''}
                           objectFit="cover"
                           layout="fill"
                           sizes="20vw"
                           priority
                        />
                     </Flex>
                     <Divider orientation="vertical" />
                  </>
               )}
               <Box
                  px="3"
                  py="2"
                  boxSizing="border-box"
                  h="full"
                  display="flex"
                  alignItems="center"
                  flexGrow={1}
               >
                  <Heading as="span" fontSize="sm">
                     {child.title}
                  </Heading>
               </Box>
            </Flex>
         </chakra.a>
      </NextLink>
   );
};

const computeMaskMaxHeight = (
   pixelLinkHeight: number,
   pixelGap: number,
   isShowingMore: boolean,
   maxHeight = 10000
) => {
   const shadowMargin = 4;
   if (isShowingMore) {
      return `${maxHeight + shadowMargin}px`;
   }
   return {
      base: `${4 * pixelLinkHeight + 3 * pixelGap + shadowMargin}px`,
      sm: `${3 * pixelLinkHeight + 2 * pixelGap + shadowMargin}px`,
   };
};

const computeShowMoreVisibility = (itemCount: number) => ({
   base: itemCount > 4 ? 'block' : 'none',
   sm: itemCount > 6 ? 'block' : 'none',
   md: itemCount > 9 ? 'block' : 'none',
   lg: itemCount > 12 ? 'block' : 'none',
});
