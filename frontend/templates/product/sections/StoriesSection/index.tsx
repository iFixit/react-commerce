import { Box, Flex, Heading } from '@chakra-ui/react';
import { PageContentWrapper } from '@ifixit/ui';

export type StoriesSectionProps = {};

export function StoriesSection() {
   return (
      <Box>
         <PageContentWrapper>
            <Heading
               as="h2"
               fontFamily="Archivo Black"
               color="gray.700"
               textAlign="center"
               mb="5"
               size="lg"
            >
               Stories
            </Heading>
            <Flex
               bg="gray.300"
               h="200px"
               rounded="md"
               align="center"
               justify="center"
               mb="16"
            >
               <div>Product story goes here</div>
            </Flex>
         </PageContentWrapper>
      </Box>
   );
}
