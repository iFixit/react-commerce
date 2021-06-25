import {
   Box,
   Button,
   Center,
   Flex,
   Heading,
   HStack,
   Icon,
   Image,
   LinkBox,
   LinkOverlay,
   Menu,
   MenuButton,
   MenuItem,
   MenuList,
   Select,
   SimpleGrid,
   VStack,
} from '@chakra-ui/react';
import { Card } from '@components/Card';
import { ALGOLIA_API_KEY, ALGOLIA_APP_ID } from '@config/env';
import { Collection } from '@features/collection';
import {
   CollectionFilters,
   CollectionPagination,
   CollectionProducts,
   CollectionToolbar,
   ProductViewType,
   SearchInput,
} from '@features/collection/components';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { AlgoliaProvider } from '@lib/algolia';
import NextLink from 'next/link';
import * as React from 'react';
import { IconType } from 'react-icons';
import { FcKindle } from 'react-icons/fc';
import { HiChevronDown, HiOutlineViewGrid } from 'react-icons/hi';
import { IoIosPhonePortrait } from 'react-icons/io';
import {
   IoPhonePortraitOutline,
   IoTabletPortraitOutline,
} from 'react-icons/io5';
import { RiMacbookLine } from 'react-icons/ri';

export type PartsCollectionViewProps = {
   collection: Collection;
};

export function PartsCollectionView(props: PartsCollectionViewProps) {
   return (
      <DefaultLayout title={`iFixit | ${props.collection.title}`}>
         <View {...props} />
      </DefaultLayout>
   );
}

function View({ collection }: PartsCollectionViewProps) {
   const [productViewType, setProductViewType] = React.useState(
      ProductViewType.List
   );
   return (
      <AlgoliaProvider
         appId={ALGOLIA_APP_ID}
         apiKey={ALGOLIA_API_KEY}
         indexName="shopify_ifixit_test_products"
      >
         <VStack
            w={{ base: 'full', lg: '960px', xl: '1100px' }}
            mx="auto"
            align="stretch"
            py={10}
            spacing={12}
         >
            <Box
               backgroundImage={
                  collection.image
                     ? `url("${collection.image.url}")`
                     : undefined
               }
               backgroundSize="cover"
               borderRadius={{
                  base: 0,
                  sm: 'xl',
               }}
               overflow="hidden"
            >
               <Flex
                  grow={1}
                  bgColor="blackAlpha.800"
                  align="center"
                  justify="center"
                  py={20}
               >
                  <VStack>
                     <Heading
                        color="white"
                        size="xl"
                        fontFamily="Archivo Black"
                     >
                        {collection.title}
                     </Heading>
                     <HStack>
                        <CategoryInput />
                        <Select
                           bg="white"
                           placeholder="Choose Manufacturer"
                           // fontWeight="bold"
                           color="gray.400"
                        >
                           <option value="option1">Option 1</option>
                           <option value="option2">Option 2</option>
                           <option value="option3">Option 3</option>
                        </Select>
                        <SearchInput maxW={300} />
                        {/* <InputGroup overflow="hidden">
                           <Input placeholder="Keywords" bg="white" />
                           <InputRightElement>
                              <Icon as={HiOutlineSearch} color="gray.400" />
                           </InputRightElement>
                        </InputGroup> */}
                     </HStack>
                  </VStack>
               </Flex>
            </Box>
            <VStack mb={4} align="stretch" spacing={4}>
               <CollectionToolbar
                  productViewType={productViewType}
                  onProductViewTypeChange={setProductViewType}
               />
               <HStack align="flex-start" spacing={{ base: 0, sm: 4 }}>
                  <Card
                     p={6}
                     width="250px"
                     display={{ base: 'none', sm: 'block' }}
                     position="sticky"
                     top="4"
                     maxH="calc(100vh - var(--chakra-space-4) * 2)"
                     overflow="scroll"
                  >
                     <CollectionFilters />
                  </Card>
                  <Card
                     flex={1}
                     alignItems="center"
                     borderRadius={{ base: 'none', sm: 'lg' }}
                  >
                     <CollectionProducts viewType={productViewType} />
                     <CollectionPagination />
                  </Card>
               </HStack>
            </VStack>
            <SimpleGrid columns={4} spacing={6}>
               {collection.children.map((child) => {
                  return (
                     <LinkBox
                        key={child.handle}
                        bg="white"
                        borderRadius="lg"
                        overflow="hidden"
                        boxShadow="sm"
                        _hover={{
                           boxShadow: 'md',
                        }}
                        transition="all 300ms"
                     >
                        <Flex direction="column">
                           {child.image && (
                              <Image
                                 objectFit="cover"
                                 h="180px"
                                 src={child.image.url}
                                 alt={child.image.alt}
                                 display={{
                                    base: 'none',
                                    md: 'block',
                                 }}
                              />
                           )}
                           <Center py={4}>
                              <NextLink
                                 href={`/collections/${child.handle}`}
                                 passHref
                              >
                                 <LinkOverlay>
                                    <Heading as="h2" size="sm">
                                       {child.title}
                                    </Heading>
                                 </LinkOverlay>
                              </NextLink>
                           </Center>
                        </Flex>
                     </LinkBox>
                  );
               })}
            </SimpleGrid>
         </VStack>
      </AlgoliaProvider>
   );
}

interface CategoryInputProps {}

function CategoryInput() {
   return (
      <Box>
         <Menu>
            <MenuButton
               as={Button}
               lineHeight="1em"
               leftIcon={<Icon as={HiOutlineViewGrid} color="gray.500" />}
               rightIcon={<Icon as={HiChevronDown} />}
            >
               Choose category
            </MenuButton>
            <MenuList
               display="grid"
               gridTemplateColumns="repeat(auto-fill, minmax(180px, 1fr))"
               gridGap="1px"
               p="0"
               bg="gray.200"
               overflow="hidden"
               minW="container.sm"
            >
               {Object.keys(categoryIcons).map((category) => {
                  return (
                     <MenuItem
                        key={category}
                        bg="white"
                        py="2"
                        icon={
                           <Icon
                              as={categoryIcons[category]}
                              color="blue.500"
                              fill="blue.500"
                              boxSize="6"
                           />
                        }
                     >
                        {category}
                     </MenuItem>
                  );
               })}
            </MenuList>
         </Menu>
      </Box>
   );
}

const categoryIcons: Record<string, IconType> = {
   'Mac Parts': RiMacbookLine,
   'iPhone Parts': IoPhonePortraitOutline,
   'iPad Parts': IoTabletPortraitOutline,
   'iPod Parts': IoIosPhonePortrait,
   'Amazon Kindle Parts': FcKindle,
};
