import { Box, chakra, Flex, List, ListItem } from '@chakra-ui/react';
import Link from 'next/link';
import * as React from 'react';
import queryString from 'query-string';
import { useRouter } from 'next/router';

export default function HomePage() {
   const router = useRouter();

   React.useEffect(() => {
      console.log('PARAMS', router.query);
   }, [router.query]);

   React.useEffect(() => {
      const filters = {
         q: 'batteries',
         brand: ['nike', 'adidas'],
         material: ['cotton'],
         price_min: 20,
      };
      const qs = queryString.stringify(filters);
      console.log('QS', qs);
      console.log('PARSED', queryString.parse(qs));
   }, []);
   return (
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
   );
}
