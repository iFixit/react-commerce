import {
   Box,
   Divider,
   Flex,
   Heading,
   LinkBox,
   LinkOverlay,
   SimpleGrid,
   VStack,
} from '@chakra-ui/react';
import { productListPath } from '@helpers/path-helpers';
import { ResponsiveImage, Wrapper } from '@ifixit/ui';
import type { ProductListPreview } from '@models/product-list';
import NextLink from 'next/link';

export type FeaturedProductListsSectionProps = {
   title: string;
   productLists: ProductListPreview[];
};

export function FeaturedProductListsSection({
   title,
   productLists,
}: FeaturedProductListsSectionProps) {
   return (
      <Box as="section">
         <Wrapper>
            <VStack spacing="6" align="stretch">
               <Heading size="lg">{title}</Heading>
               <SimpleGrid
                  columns={{
                     base: 1,
                     sm: 2,
                     md: 3,
                  }}
                  spacing="4"
               >
                  {productLists.map((list) => {
                     return (
                        <ProductListLink key={list.handle} productList={list} />
                     );
                  })}
               </SimpleGrid>
            </VStack>
         </Wrapper>
      </Box>
   );
}

interface ProductListLinkProps {
   productList: ProductListPreview;
}

const ProductListLink = ({ productList }: ProductListLinkProps) => {
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
            {productList.image && (
               <Flex
                  align="center"
                  justify="center"
                  flexBasis="80px"
                  h="60px"
                  flexGrow={0}
                  flexShrink={0}
               >
                  <ResponsiveImage
                     src={
                        productList.image.thumbnailUrl ?? productList.image.url
                     }
                     alt=""
                     width={80}
                     height={60}
                     style={{
                        objectFit: 'contain',
                     }}
                  />
               </Flex>
            )}
            <Divider orientation="vertical" />
            <NextLink
               href={productListPath(productList)}
               passHref
               legacyBehavior
            >
               <LinkOverlay
                  px="3"
                  py="2"
                  boxSizing="border-box"
                  h="full"
                  display="flex"
                  alignItems="center"
                  flexGrow={1}
               >
                  <Heading as="h3" fontSize="sm">
                     {productList.title}
                  </Heading>
               </LinkOverlay>
            </NextLink>
         </Flex>
      </LinkBox>
   );
};
