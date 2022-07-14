import { Box, Flex } from '@chakra-ui/react';
import { PageContentWrapper } from '@ifixit/ui';

export type LegacyBannerSectionProps = {};

export function LegacyBannerSection() {
   return (
      <Box py="16">
         <PageContentWrapper>
            <Flex
               bg="gray.300"
               h="200px"
               rounded="md"
               align="center"
               justify="center"
            >
               <div>Valkyrie banner goes here</div>
            </Flex>
         </PageContentWrapper>
      </Box>
   );
}
