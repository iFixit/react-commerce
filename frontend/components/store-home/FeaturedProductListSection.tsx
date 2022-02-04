import { Box, VStack } from '@chakra-ui/react';
import { FeaturedProductListSection as SectionData } from '@models/page';
import { PageContentWrapper } from './PageContentWrapper';
import { SectionDescription } from './SectionDescription';
import { SectionHeading } from './SectionHeading';

export interface FeaturedProductListSectionProps {
   data: SectionData;
}

export function FeaturedProductListSection({
   data: { title, description, productListHandle },
}: FeaturedProductListSectionProps) {
   return (
      <Box as="section" position="relative" w="full" bg="white" pt="16">
         <PageContentWrapper>
            <VStack textAlign="center" spacing="4">
               {title && <SectionHeading>{title}</SectionHeading>}
               {description && (
                  <SectionDescription richText={description} maxW="750px" />
               )}
            </VStack>
         </PageContentWrapper>
      </Box>
   );
}
