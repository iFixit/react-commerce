import { Flex, forwardRef, Heading } from '@chakra-ui/react';
import { ResponsiveImage } from '@ifixit/ui';
import { ImageProps } from 'next/image';
import { PrerenderedHTML } from '@components/common';

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
              }
            : {
                 height: 80,
                 width: 80,
              };
      const { placeholder, ...restImageSizeProps } = imageSizeProps;
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
               <Flex
                  w={Number(imageSizeProps.width) / 4}
                  h={Number(imageSizeProps.height) / 4}
                  position="relative"
                  borderWidth="1px"
                  borderColor="gray.300"
                  borderRadius="base"
                  borderStyle="solid"
                  boxSizing="content-box"
                  alignItems="center"
                  bgColor="white"
                  mr="2"
                  flexShrink={0}
                  overflow="hidden"
               >
                  <ResponsiveImage
                     src={productList.imageUrl}
                     alt=""
                     style={{ objectFit: 'contain' }}
                     priority
                     {...restImageSizeProps}
                  />
               </Flex>
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
                  <PrerenderedHTML
                     html={productList.description}
                     template="commerce"
                     mt="1"
                     color="gray.600"
                     fontSize="sm"
                     lineHeight="shorter"
                  />
               )}
            </Flex>
         </Flex>
      );
   }
);
