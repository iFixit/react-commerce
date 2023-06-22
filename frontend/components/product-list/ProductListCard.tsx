import { Box, Flex, forwardRef, Heading } from '@chakra-ui/react';
import { ResponsiveImage } from '@ifixit/ui';
import { ImageProps } from 'next/image';

interface ProductListCardProps {
   variant?: 'small' | 'medium';
   productList: {
      title: string;
      description?: string | null;
      imageUrl?: string | null;
   };
}

export const ProductListCard = forwardRef<ProductListCardProps, 'div'>(
   ({ productList, variant = 'small', ...other }, ref) => {
      const imageSizeProps: Partial<ImageProps> =
         variant === 'small'
            ? {
                 height: 48,
                 width: 48,
                 layout: 'fixed',
                 objectFit: 'contain',
              }
            : {
                 height: 80,
                 width: 80,
                 layout: 'fixed',
                 objectFit: 'contain',
              };
      return (
         <Flex
            ref={ref}
            bg="white"
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
            align="flex-start"
            h="full"
            minH="16"
            {...other}
         >
            {productList.imageUrl && (
               <Box
                  w={Number(imageSizeProps.width) / 4}
                  h={Number(imageSizeProps.height) / 4}
                  position="relative"
                  borderWidth="1px"
                  borderColor="gray.300"
                  borderRadius="base"
                  borderStyle="solid"
                  boxSizing="content-box"
                  bgColor="white"
                  mr="2"
                  flexShrink={0}
                  overflow="hidden"
               >
                  <ResponsiveImage
                     src={productList.imageUrl}
                     alt=""
                     priority
                     {...imageSizeProps}
                  />
               </Box>
            )}
            <Flex
               boxSizing="border-box"
               h="full"
               justify="center"
               direction="column"
               flexGrow={1}
            >
               <Heading as="span" fontSize="sm" fontWeight="semibold">
                  {productList.title}
               </Heading>
               {variant === 'medium' && productList.description && (
                  <Box
                     mt="1"
                     color="gray.600"
                     fontSize="sm"
                     lineHeight="shorter"
                     dangerouslySetInnerHTML={{
                        __html: productList.description,
                     }}
                  />
               )}
            </Flex>
         </Flex>
      );
   }
);
