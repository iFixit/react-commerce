import { Box, Button, Flex, Text, VStack } from '@chakra-ui/react';
import storeHomeWorkbenchPatternImage from '@images/store-home-workbench-pattern.png';
import Image from 'next/image';
import { PageContentWrapper } from './PageContentWrapper';
import { SectionHeading } from './SectionHeading';
import { WorkbenchSection as SectionData } from '@models/page';

export interface WorkbenchSectionProps {
   data: SectionData;
}

export function WorkbenchSection({ data: { title } }: WorkbenchSectionProps) {
   return (
      <Box as="section" position="relative" w="full" my="16">
         <PageContentWrapper>
            <Flex
               w="full"
               bg="blue.100"
               borderColor="blue.500"
               borderWidth="1px"
               borderRadius="lg"
               justifyContent="space-between"
               overflow="hidden"
            >
               <VStack align="flex-start" p="7">
                  <SectionHeading color="blue.500">
                     {title ?? 'Your workbench'}
                  </SectionHeading>
                  <Text color="gray.800">
                     Discover parts guaranteed to be compatible with your{' '}
                     <strong>iPhone8</strong>
                  </Text>
                  <Button colorScheme="brand">Shop now</Button>
               </VStack>
               <Box w="50%" position="relative">
                  <Image
                     src={storeHomeWorkbenchPatternImage}
                     alt="store hero image"
                     priority
                     layout="fill"
                     objectFit="cover"
                  />
               </Box>
            </Flex>
         </PageContentWrapper>
      </Box>
   );
}
