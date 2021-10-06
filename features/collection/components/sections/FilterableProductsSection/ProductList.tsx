import {
   AspectRatio,
   Badge,
   Box,
   Button,
   Divider,
   Flex,
   Heading,
   HStack,
   Img,
   LinkBox,
   LinkOverlay,
   Stack,
   Text,
   VStack,
} from '@chakra-ui/react';
import { Rating } from '@components/Rating';
import { ShopifyImage } from '@components/ShopifyImage';
import { ProductHit } from '@features/collection';
import { computeDiscountPercentage } from '@lib/commerce-utils';
import * as React from 'react';

const placeholderImageUrl =
   'https://via.placeholder.com/180x135?text=not+available';

export type ProductListProps = React.PropsWithChildren<unknown>;

export function ProductList({ children }: ProductListProps) {
   return (
      <VStack
         spacing={2}
         align="stretch"
         width="full"
         boxSizing="border-box"
         divider={<Divider />}
      >
         {children}
      </VStack>
   );
}

export interface ProductListItemProps {
   product: ProductHit;
}

export function ProductListItem({ product }: ProductListItemProps) {
   const isDiscounted =
      product.compare_at_price != null &&
      product.compare_at_price > product.price;

   const percentage = isDiscounted
      ? computeDiscountPercentage(
           product.price * 100,
           product.compare_at_price! * 100
        )
      : 0;

   return (
      <LinkBox as="article">
         <Stack
            direction={{
               base: 'column',
               sm: 'row',
               md: 'column',
               lg: 'row',
            }}
            spacing={{
               base: 2,
               sm: 4,
            }}
            py="7"
            alignItems="flex-start"
            px="4"
         >
            <AspectRatio
               flexGrow={1}
               flexShrink={0}
               w={{
                  base: '100px',
                  sm: '160px',
                  md: '140px',
                  lg: '160px',
               }}
               ratio={1}
            >
               {product.product_image == null ? (
                  <Img
                     sizes="180px"
                     src={placeholderImageUrl}
                     alt={product.title}
                  />
               ) : (
                  <ShopifyImage
                     src={product.product_image || placeholderImageUrl}
                     alt={product.title}
                     sizes="180px"
                  />
               )}
            </AspectRatio>
            <VStack
               align="flex-start"
               spacing={{
                  base: 4,
               }}
               flexShrink={1}
               w="full"
            >
               <Heading
                  as="h2"
                  fontSize={{
                     base: 'sm',
                     sm: 'md',
                     lg: 'lg',
                  }}
               >
                  {product.title}
               </Heading>
               <Text
                  noOfLines={3}
                  fontSize={{
                     base: 'xs',
                     sm: 'sm',
                     lg: 'md',
                  }}
               >
                  {product.body_html_safe}
               </Text>
               <HStack>
                  <Rating value={4} />
                  <Text>102</Text>
               </HStack>
               <Box>
                  <Flex
                     wrap="wrap"
                     mt="-1"
                     sx={{
                        '& > *': {
                           mr: 1,
                           mt: 1,
                        },
                     }}
                  >
                     {product.inventory_quantity > 0 ? (
                        <>
                           {percentage > 0 && (
                              <Badge
                                 colorScheme="red"
                                 textTransform="none"
                                 borderRadius="lg"
                                 px="2.5"
                                 py="1"
                              >
                                 {percentage}% Off
                              </Badge>
                           )}
                           <Badge
                              colorScheme="blue"
                              textTransform="none"
                              borderRadius="lg"
                              px="2.5"
                              py="1"
                           >
                              Lifetime warranty
                           </Badge>
                           <Badge
                              colorScheme="blue"
                              textTransform="none"
                              borderRadius="lg"
                              px="2.5"
                              py="1"
                           >
                              Ship today if ordered by 5pm
                           </Badge>
                        </>
                     ) : (
                        <Badge
                           colorScheme="gray"
                           textTransform="none"
                           borderRadius="lg"
                           px="2.5"
                           py="1"
                        >
                           Sold out
                        </Badge>
                     )}
                  </Flex>
               </Box>
            </VStack>
            <VStack
               flexShrink={0}
               align="flex-end"
               alignSelf={{
                  base: 'flex-end',
                  sm: 'flex-start',
                  md: 'flex-end',
                  lg: 'flex-start',
               }}
            >
               <VStack
                  align="flex-end"
                  spacing="0"
                  mt={{
                     base: 2,
                  }}
               >
                  <Text
                     color={isDiscounted ? 'red.700' : 'inherit'}
                     fontWeight="bold"
                     fontSize="xl"
                     lineHeight="1em"
                  >
                     ${product.price}
                  </Text>
                  {isDiscounted && (
                     <Text
                        lineHeight="1em"
                        textDecoration="line-through"
                        color="gray.400"
                     >
                        ${product.compare_at_price}
                     </Text>
                  )}
               </VStack>
               <Stack
                  direction={{
                     base: 'row-reverse',
                     sm: 'column',
                     md: 'row-reverse',
                     lg: 'column',
                  }}
                  align={{
                     base: 'center',
                     sm: 'flex-end',
                     md: 'center',
                     lg: 'flex-end',
                  }}
                  spacing={{
                     base: 3,
                     sm: 2,
                  }}
               >
                  <LinkOverlay
                     href={`https://ifixit.com/Store/Product/${product.sku}`}
                  >
                     <Button
                        as="div"
                        minW={{
                           base: '100px',
                           sm: '60px',
                           md: '100px',
                           lg: '60px',
                        }}
                        colorScheme="brand"
                     >
                        View
                     </Button>
                  </LinkOverlay>
                  <Text color="gray.500" fontSize="14px">
                     {product.inventory_quantity > 0 &&
                     product.inventory_quantity < 10
                        ? `
               Only ${product.inventory_quantity} left in stock
               `
                        : `${product.inventory_quantity} in stock`}
                  </Text>
               </Stack>
            </VStack>
         </Stack>
      </LinkBox>
   );
}
