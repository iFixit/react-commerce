import {
   AspectRatio,
   Box,
   Button,
   Center,
   Flex,
   Heading,
   Img,
   Text,
   useBreakpointValue,
   VStack,
} from '@chakra-ui/react';
import { Card } from '@components/Card';
import {
   ProductCard,
   ProductCardBody,
   ProductCardImage,
   ProductCardPrice,
   ProductCardTitle,
} from '@components/ProductCard';
import { ALGOLIA_API_KEY, ALGOLIA_APP_ID } from '@config/env';
import { ProductHit } from '@features/collection';
import { AlgoliaProvider, useHits } from '@lib/algolia';
import NextLink from 'next/link';
import * as React from 'react';

export interface FeaturedCollectionSection {
   handle: string;
   title: string;
   description: string;
   imageSrc?: string;
   imageAlt?: string;
   algoliaIndexName: string;
}

export function FeaturedCollectionSection({
   handle,
   title,
   description,
   imageAlt,
   imageSrc,
   algoliaIndexName,
}: FeaturedCollectionSection) {
   return (
      <Card
         overflow="hidden"
         borderRadius={{
            base: 'none',
            sm: 'lg',
         }}
      >
         <Flex
            direction={{
               base: 'column',
               sm: 'row',
            }}
         >
            <Box
               position="relative"
               flexShrink={0}
               maxW={{
                  base: 'full',
                  sm: '300px',
                  lg: '400px',
               }}
            >
               {imageSrc && (
                  <Img
                     objectFit="cover"
                     h="full"
                     src={imageSrc}
                     alt={imageAlt}
                  />
               )}
               <Center
                  position="absolute"
                  top="0"
                  left="0"
                  right="0"
                  h="100%"
                  bg="blackAlpha.700"
               >
                  <VStack
                     px={{
                        base: '5',
                        sm: '7',
                        lg: '14',
                     }}
                     align="flex-start"
                     spacing="4"
                  >
                     <Heading
                        size="lg"
                        fontFamily="Archivo Black"
                        color="white"
                     >
                        {title}
                     </Heading>
                     <Text color="white" noOfLines={2}>
                        {description}
                     </Text>
                     <NextLink href={`/collections/${handle}`} passHref>
                        <Button
                           as="a"
                           variant="outline"
                           color="white"
                           fontSize="sm"
                           colorScheme="whiteAlpha"
                        >
                           View more
                        </Button>
                     </NextLink>
                  </VStack>
               </Center>
            </Box>
            <Box flexGrow={1}>
               <AlgoliaProvider
                  key={handle}
                  appId={ALGOLIA_APP_ID}
                  apiKey={ALGOLIA_API_KEY}
                  initialIndexName={algoliaIndexName}
                  initialRawFilters={`collections:${handle}`}
                  productsPerPage={3}
               >
                  <ProductList />
               </AlgoliaProvider>
            </Box>
         </Flex>
      </Card>
   );
}

function ProductList() {
   const { hits } = useHits<ProductHit>();
   return (
      <Flex>
         {hits.map((hit) => {
            return <ProductGridItem key={hit.handle} product={hit} />;
         })}
      </Flex>
   );
}

interface ProductGridItemProps {
   product: ProductHit;
}

function ProductGridItem({ product }: ProductGridItemProps) {
   return (
      <ProductCard
         w="33%"
         flexGrow={1}
         sx={{
            // '&:nth-of-type(n+2)': {
            //    display: {
            //       base: 'block',
            //       sm: 'none',
            //       md: 'block',
            //    },
            // },
            '&:nth-of-type(n+3)': {
               display: {
                  base: 'none',
                  md: 'block',
               },
            },
         }}
      >
         <ProductCardImage src={product.product_image} alt={product.title} />
         <ProductCardBody>
            <ProductCardTitle>{product.title}</ProductCardTitle>
            <ProductCardPrice price={product.price} />
         </ProductCardBody>
      </ProductCard>
   );
}
