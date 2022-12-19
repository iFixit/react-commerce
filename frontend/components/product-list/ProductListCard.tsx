import {
   Box,
   BoxProps,
   Divider,
   Flex,
   forwardRef,
   Heading,
} from '@chakra-ui/react';
import { ResponsiveImage } from '@ifixit/ui';
import { ImageProps } from 'next/image';

type ProductListCardProps = BoxProps & {
   variant?: 'small' | 'medium';
   productList: {
      title: string;
      description?: string | null;
      imageUrl?: string | null;
   };
};

export const ProductListCard = forwardRef<ProductListCardProps, 'div'>(
   ({ productList, variant = 'small', ...other }, ref) => {
      const imageSizeProps: Partial<ImageProps> =
         variant === 'small'
            ? {
                 height: 60,
                 width: 80,
                 layout: 'fixed',
              }
            : {
                 sizes: '20vw',
                 objectFit: 'cover',
                 layout: 'fill',
              };
      return (
         <Box
            ref={ref}
            display="block"
            bg="white"
            borderRadius="lg"
            boxShadow="base"
            _hover={{
               boxShadow: 'md',
            }}
            transition="box-shadow 300ms"
            outline="none"
            overflow="hidden"
            h={{
               base: '60px',
               md: variant === 'small' ? '60px' : '120px',
            }}
            _focus={{
               boxShadow: 'outline',
            }}
            {...other}
         >
            <Flex
               h="full"
               direction="row"
               align="center"
               justifyContent="center"
               minH="inherit"
            >
               {productList.imageUrl && (
                  <>
                     <Flex
                        align="center"
                        justify="center"
                        flexBasis={{
                           base: '80px',
                           md: variant === 'small' ? '80px' : '160px',
                        }}
                        h="full"
                        flexGrow={0}
                        flexShrink={0}
                        p={{
                           base: 0,
                           md: variant === 'small' ? 0 : 3,
                        }}
                     >
                        <Box position="relative" h="full" w="full">
                           <ResponsiveImage
                              src={productList.imageUrl}
                              alt=""
                              priority
                              {...imageSizeProps}
                           />
                        </Box>
                     </Flex>
                     <Divider orientation="vertical" borderColor="gray.200" />
                  </>
               )}
               <Flex
                  px="4"
                  py="2"
                  boxSizing="border-box"
                  h="full"
                  justify="center"
                  direction="column"
                  flexGrow={1}
               >
                  <Heading as="span" fontSize="sm">
                     {productList.title}
                  </Heading>
                  {variant === 'medium' && productList.description && (
                     <Box
                        mt="1"
                        display={{ base: 'none', md: 'block' }}
                        color="gray.600"
                        fontSize="sm"
                        dangerouslySetInnerHTML={{
                           __html: productList.description,
                        }}
                     />
                  )}
               </Flex>
            </Flex>
         </Box>
      );
   }
);
