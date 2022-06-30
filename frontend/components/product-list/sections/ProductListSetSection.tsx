import {
   Divider,
   Flex,
   Heading,
   LinkBox,
   LinkOverlay,
   SimpleGrid,
   VStack,
} from '@chakra-ui/react';
import { ProductListPreview } from '@models/product-list';
import { IfixitImage } from '@components/ifixit-image';
import NextLink from 'next/link';
import * as React from 'react';

export type ProductListSetSectionProps = {
   title: string;
   productLists: ProductListPreview[];
};

export function ProductListSetSection({
   title,
   productLists,
}: ProductListSetSectionProps) {
   return (
      <VStack
         spacing="6"
         align="stretch"
         px={{
            base: 6,
            sm: 0,
         }}
      >
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
               return <ProductListLink key={list.handle} productList={list} />;
            })}
         </SimpleGrid>
      </VStack>
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
                  <IfixitImage
                     src={productList.image.url}
                     alt={productList.image.alternativeText ?? ''}
                     width="80px"
                     height="60px"
                     objectFit="contain"
                  />
               </Flex>
            )}
            <Divider orientation="vertical" />
            <NextLink href={productList.path} passHref>
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
