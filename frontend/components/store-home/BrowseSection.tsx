import {
   Box,
   Flex,
   Heading,
   Icon,
   Input,
   InputGroup,
   InputLeftElement,
   SimpleGrid,
   Text,
   VStack,
} from '@chakra-ui/react';
import { ProductListPreviewLink } from '@components/product-list';
import { IFIXIT_ORIGIN } from '@config/env';
import { BrowseSection as SectionData } from '@models/page';
import Image from 'next/image';
import { RiSearchLine } from 'react-icons/ri';
import { PageContentWrapper } from './PageContentWrapper';
import { SectionDescription } from './SectionDescription';
import { SectionHeading } from './SectionHeading';

export interface BrowseSectionProps {
   data: SectionData;
}

export function BrowseSection({
   data: { title, description, image, featuredProductLists },
}: BrowseSectionProps) {
   return (
      <Flex as="section" direction="column" mb="16">
         <Box position="relative" w="full">
            <Box
               position="absolute"
               bg="blue.500"
               zIndex={-1}
               w="full"
               h="full"
               opacity={0.8}
            />
            {image && (
               <Box
                  position="absolute"
                  bg="green"
                  zIndex={-2}
                  w="full"
                  h="full"
               >
                  <Image
                     src={image.url}
                     alt="store search image"
                     priority
                     layout="fill"
                     objectFit="cover"
                     objectPosition="center"
                  />
               </Box>
            )}
            <PageContentWrapper py="16">
               <VStack align="center">
                  {title && (
                     <SectionHeading color="white">{title}</SectionHeading>
                  )}
                  {description && (
                     <SectionDescription
                        richText={description}
                        color="blue.100"
                     />
                  )}
               </VStack>
            </PageContentWrapper>
         </Box>
         <PageContentWrapper>
            <VStack spacing="4">
               <Flex
                  as="form"
                  method="GET"
                  action={`${IFIXIT_ORIGIN}/Search`}
                  w="full"
                  justify="center"
               >
                  <InputGroup
                     transform="translateY(-50%)"
                     size="lg"
                     w={{
                        base: 'full',
                        md: '460px',
                     }}
                  >
                     <InputLeftElement pointerEvents="none">
                        <Icon
                           as={RiSearchLine}
                           color="gray.400"
                           mr="-2"
                           mb="-1px"
                        />
                     </InputLeftElement>
                     <Input
                        name="query"
                        placeholder="Search.."
                        tabIndex={0}
                        variant="filled"
                        bg="white"
                        _hover={{
                           bg: 'gray.50',
                        }}
                        _focus={{
                           bg: 'white',
                           boxShadow: 'outline',
                        }}
                        fontSize="sm"
                        borderRadius="md"
                        boxShadow="lg"
                     />
                  </InputGroup>
               </Flex>
               <Text>or explore by category</Text>
            </VStack>
            <SimpleGrid
               pt="10"
               columns={{
                  base: 1,
                  sm: 2,
                  md: 3,
                  lg: 4,
               }}
               spacing="4"
            >
               {featuredProductLists.map((child) => {
                  return (
                     <ProductListPreviewLink
                        key={child.handle}
                        title={child.title}
                        handle={child.handle}
                        image={child.image}
                     />
                  );
               })}
            </SimpleGrid>
         </PageContentWrapper>
      </Flex>
   );
}
