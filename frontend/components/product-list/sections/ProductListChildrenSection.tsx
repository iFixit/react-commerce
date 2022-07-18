import {
   Box,
   Button,
   chakra,
   Collapse,
   Divider,
   Flex,
   Heading,
   SimpleGrid,
   Text,
   useBreakpointValue,
   VStack,
} from '@chakra-ui/react';
import { IfixitImage } from '@components/ifixit-image';
import {
   getProductListPath,
   getProductListTitle,
} from '@helpers/product-list-helpers';
import { useIsMounted } from '@ifixit/ui';
import { ProductList } from '@models/product-list';
import NextLink from 'next/link';
import * as React from 'react';
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
   const [shouldShowMore, setShouldShowMore] = React.useState(false);
   const responsiveVisibleChildrenCount = useBreakpointValue(
      {
         base: 4,
         sm: 6,
         md: 12,
      },
      'md'
   );
   const isMounted = useIsMounted();
   const visibleChildrenCount = isMounted ? responsiveVisibleChildrenCount : 12;

   const itemType = useDevicePartsItemType(productList);
   const augmentedChildren = React.useMemo(
      () =>
         productListChildren.map((child) => {
            return {
               ...child,
               path: getProductListPath(
                  {
                     deviceTitle: child.deviceTitle,
                     type: child.type,
                     handle: child.handle,
                  },
                  itemType
               ),
               title: getProductListTitle(
                  {
                     type: child.type,
                     title: child.title,
                  },
                  itemType
               ),
            };
         }),
      [itemType, productListChildren]
   );

   const visibleChildren = React.useMemo(() => {
      return augmentedChildren.slice(0, visibleChildrenCount);
   }, [augmentedChildren, visibleChildrenCount]);

   const hiddenChildren = React.useMemo(() => {
      return augmentedChildren.slice(
         visibleChildrenCount,
         augmentedChildren.length
      );
   }, [augmentedChildren, visibleChildrenCount]);

   const onToggle = React.useCallback(() => {
      setShouldShowMore((current) => !current);
   }, []);

   let heading = 'Choose a model';
   if (childrenHeading && childrenHeading.length > 0) {
      heading = childrenHeading;
   } else if (deviceTitle && deviceTitle.length > 0) {
      heading = `Choose a model of ${deviceTitle}`;
   }

   return (
      <Box
         px={{
            base: 6,
            sm: 0,
         }}
      >
         <Text fontSize="lg" fontWeight="bold" mb="4">
            {heading}
         </Text>
         <VStack data-testid="product-list-devices" spacing="4" align="stretch">
            <SimpleGrid
               columns={{
                  base: 1,
                  sm: 2,
                  md: 3,
                  lg: 4,
               }}
               spacing="4"
            >
               {visibleChildren.map((child) => {
                  return <ChildLink key={child.handle} child={child} />;
               })}
            </SimpleGrid>
            {isMounted && hiddenChildren.length > 0 && (
               <Collapse in={shouldShowMore}>
                  <SimpleGrid
                     columns={{
                        base: 1,
                        sm: 2,
                        md: 3,
                        lg: 4,
                     }}
                     spacing="4"
                  >
                     {hiddenChildren.map((child) => {
                        return <ChildLink key={child.handle} child={child} />;
                     })}
                  </SimpleGrid>
               </Collapse>
            )}
         </VStack>
         {hiddenChildren.length > 0 && (
            <Box mt="3">
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
                  {shouldShowMore ? 'Show less' : 'Show more'}
               </Button>
            </Box>
         )}
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
            href={child.path}
            bg="white"
            borderRadius="lg"
            boxShadow="base"
            _hover={{
               boxShadow: 'md',
            }}
            transition="all 300ms"
            outline="none"
            overflow="hidden"
            minHeight="60px"
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
