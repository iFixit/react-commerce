import { Box, Flex, Text } from '@chakra-ui/react';
import { ResponsiveImage, Wrapper } from '@ifixit/ui';
import type { Image } from '@models/components/image';

interface QuoteSectionProps {
   id: string;
   quote: string;
   author?: string | null;
   image?: Image | null;
}

export function QuoteSection({ id, quote, author, image }: QuoteSectionProps) {
   return (
      <Box
         as="section"
         position="relative"
         w="full"
         id={id}
         py={{
            base: '36',
         }}
      >
         <Box
            position="absolute"
            bgGradient="linear(to-r, blackAlpha.600 50%, blackAlpha.400)"
            zIndex={-1}
            top="0"
            left="0"
            bottom="0"
            right="0"
         />
         {image && (
            <Box
               position="absolute"
               zIndex={-2}
               top="0"
               left="0"
               bottom="0"
               right="0"
            >
               <ResponsiveImage
                  src={image.url}
                  alt=""
                  fill
                  style={{
                     objectFit: 'cover',
                  }}
               />
            </Box>
         )}
         <Wrapper>
            <Flex justify="center">
               <Text
                  color="gray.200"
                  fontSize={{
                     base: '120px',
                     md: '180px',
                  }}
                  lineHeight={{
                     base: '120px',
                     md: '180px',
                  }}
                  mt="-10"
               >
                  “
               </Text>
               <Box
                  maxW="container.md"
                  mx={{
                     base: 2,
                     md: 6,
                  }}
               >
                  <Text
                     color="white"
                     fontSize="3xl"
                     fontWeight="medium"
                     textAlign="center"
                  >
                     {quote}
                  </Text>
                  {author && (
                     <Text
                        color="white"
                        fontWeight="medium"
                        textAlign="right"
                        mt={{
                           base: 6,
                           md: 2.5,
                        }}
                     >
                        {author}
                     </Text>
                  )}
               </Box>
               <Text
                  color="gray.200"
                  fontSize={{
                     base: '120px',
                     md: '180px',
                  }}
                  lineHeight={{
                     base: '120px',
                     md: '180px',
                  }}
                  alignSelf="flex-end"
               >
                  „
               </Text>
            </Flex>
         </Wrapper>
      </Box>
   );
}
