import { Box, chakra, Flex, List, ListItem } from '@chakra-ui/react';
import Link from 'next/link';
import * as React from 'react';

export default function HomePage() {
   return (
      <Flex p={6}>
         <Box as="nav">
            <List>
               <ListItem>
                  <Link href="/store/parts" passHref>
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
                  <Link href="/store/tools" passHref>
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
   );
}
