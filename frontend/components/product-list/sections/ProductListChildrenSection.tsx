import {
   Box,
   Button,
   Collapse,
   Divider,
   Flex,
   Heading,
   LinkBox,
   LinkOverlay,
   SimpleGrid,
   Text,
   useBreakpointValue,
   VStack,
} from '@chakra-ui/react';
import Image from 'next/image';
import NextLink from 'next/link';
import * as React from 'react';

export type ProductListChildrenSectionProps = {
   heading: string;
   productListChildren: ProductListChild[];
};

export interface ProductListChild {
   handle: string;
   title: string;
   image?: {
      url: string;
      alt?: string;
   } | null;
}

export function ProductListChildrenSection({
   heading,
   productListChildren,
}: ProductListChildrenSectionProps) {
   const [shouldShowMore, setShouldShowMore] = React.useState(false);
   const visibleCategoriesCount = useBreakpointValue({
      base: 4,
      sm: 6,
      md: 12,
   });

   console.log(productListChildren);

   const visibleCategories = React.useMemo(() => {
      return productListChildren.slice(0, visibleCategoriesCount);
   }, [productListChildren, visibleCategoriesCount]);

   const hiddenCategories = React.useMemo(() => {
      return productListChildren.slice(
         visibleCategoriesCount,
         productListChildren.length
      );
   }, [productListChildren, visibleCategoriesCount]);

   const onToggle = React.useCallback(() => {
      setShouldShowMore((current) => !current);
   }, []);

   return (
      <VStack
         spacing={6}
         align="stretch"
         px={{
            base: 6,
            sm: 0,
         }}
      >
         <Text fontSize="lg" fontWeight="bold">
            Choose a model of {heading}
         </Text>
         <VStack spacing="4" align="stretch">
            <SimpleGrid
               columns={{
                  base: 1,
                  sm: 2,
                  md: 3,
                  lg: 4,
               }}
               spacing="4"
            >
               {visibleCategories.map((child) => {
                  return (
                     <ProductListPreviewLink
                        key={child.handle}
                        title={child.title}
                        handle={child.handle}
                        image={child.image}
                     />
                  );
               })}
            </SimpleGrid>
            {hiddenCategories.length > 0 && (
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
                     {hiddenCategories.map((child) => {
                        return (
                           <ProductListPreviewLink
                              key={child.handle}
                              title={child.title}
                              handle={child.handle}
                              image={child.image}
                           />
                        );
                     })}
                  </SimpleGrid>
               </Collapse>
            )}
         </VStack>
         {hiddenCategories.length > 0 && (
            <Box>
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
      </VStack>
   );
}

export interface ProductListPreviewLinkProps {
   title: string;
   handle: string;
   image?: {
      url: string;
      alt?: string;
   } | null;
}

export const ProductListPreviewLink = ({
   title,
   handle,
   image,
}: ProductListPreviewLinkProps) => {
   return (
      <LinkBox
         bg="white"
         borderRadius="lg"
         overflow="hidden"
         boxShadow="base"
         _hover={{
            boxShadow: 'md',
         }}
         transition="all 300ms"
      >
         <Flex h="full" direction="row" align="center" justifyContent="center">
            {image && (
               <Flex
                  align="center"
                  justify="center"
                  flexBasis="80px"
                  h="60px"
                  flexGrow={0}
                  flexShrink={0}
                  position="relative"
               >
                  <Image
                     src={image.url}
                     alt={image.alt}
                     objectFit="contain"
                     layout="fill"
                     sizes="20vw"
                     priority
                  />
               </Flex>
            )}
            <Divider orientation="vertical" />
            <NextLink href={`/store/${handle}`} passHref>
               <LinkOverlay
                  px="3"
                  py="2"
                  boxSizing="border-box"
                  h="full"
                  display="flex"
                  alignItems="center"
                  flexGrow={1}
               >
                  <Heading as="h2" fontSize="sm">
                     {title}
                  </Heading>
               </LinkOverlay>
            </NextLink>
         </Flex>
      </LinkBox>
   );
};
