import { Box, chakra, Flex, List, ListItem } from '@chakra-ui/react';
import { DefaultLayout } from '@layouts/DefaultLayout';
import Link from 'next/link';
import React from 'react';

export default function HomePage() {
   return (
      <DefaultLayout title="iFixit">
         <Flex p={6}>
            <Box as="nav">
               <List>
                  <ListItem>
                     <Link href="/collections/parts">
                        <chakra.a
                           color="blue.500"
                           _hover={{
                              color: 'blue.700',
                           }}
                           cursor="pointer"
                        >
                           Parts
                        </chakra.a>
                     </Link>
                  </ListItem>
                  <ListItem>
                     <Link href="/collections/tools">
                        <chakra.a
                           color="blue.500"
                           _hover={{
                              color: 'blue.700',
                           }}
                           cursor="pointer"
                        >
                           Tools
                        </chakra.a>
                     </Link>
                  </ListItem>
               </List>
            </Box>
         </Flex>
      </DefaultLayout>
   );
}
