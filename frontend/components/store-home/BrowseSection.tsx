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
import storeHomeSearchImage from '@images/store-home-search-background.jpeg';
import Image from 'next/image';
import { RiSearchLine } from 'react-icons/ri';
import { PageContentWrapper } from './PageContentWrapper';

// To be replaced with content from CMS
const featuredProductLists = [
   {
      handle: 'pc-desktop',
      title: 'PC Desktop Parts',
      image: null,
   },
   {
      handle: 'amazon-kindle',
      title: 'Amazon Kindle Parts',
      image: null,
   },
   {
      handle: 'vacuum',
      title: 'Vacuum Parts',
      image: null,
   },
   {
      handle: 'smart-home-devices',
      title: 'Smart Home Devices Parts',
      image: null,
   },
   {
      handle: 'dell-laptop',
      title: 'Dell Laptop Parts',
      image: null,
   },
   {
      handle: 'sony-laptop',
      title: 'Sony Laptop Parts',
      image: null,
   },
   {
      handle: 'hp-laptop',
      title: 'HP Laptop Parts',
      image: null,
   },
   {
      handle: 'samsung-laptop',
      title: 'Samsung Laptop Parts',
      image: null,
   },
   {
      handle: 'microsoft-surfce-parts',
      title: 'Microsoft Surface Parts',
      image: null,
   },
   {
      handle: 'samsung-television',
      title: 'Samsung Television Parts',
      image: null,
   },
   {
      handle: 'lumia-phone',
      title: 'Lumia Phone Parts',
      image: null,
   },
   {
      handle: 'apple-watch',
      title: 'Apple Watch Parts',
      image: null,
   },
   {
      handle: 'drone',
      title: 'Drone Parts',
      image: null,
   },
];

export interface BrowseSectionProps {}

export function BrowseSection({}: BrowseSectionProps) {
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
            <Box position="absolute" bg="green" zIndex={-2} w="full" h="full">
               <Image
                  src={storeHomeSearchImage}
                  alt="store search image"
                  priority
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
               />
            </Box>
            <PageContentWrapper py="16">
               <VStack align="center">
                  <Heading
                     as="h2"
                     fontFamily="Archivo Black"
                     size="lg"
                     color="white"
                  >
                     What are you fixing?
                  </Heading>
                  <Text color="blue.100">
                     Search from hundreds of devices and thousands of
                     replacement parts
                  </Text>
               </VStack>
            </PageContentWrapper>
         </Box>
         <VStack spacing="4">
            <Flex as="form" method="GET" action={`${IFIXIT_ORIGIN}/Search`}>
               <InputGroup transform="translateY(-50%)" size="lg" w="460px">
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
         <Box>
            <PageContentWrapper>
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
         </Box>
      </Flex>
   );
}
