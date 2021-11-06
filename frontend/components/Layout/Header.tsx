import { chakra, Flex, HStack } from '@chakra-ui/react';
import Link from 'next/link';
import * as React from 'react';
import { Wordmark } from './Wordmark';

export function Header() {
   return (
      <Flex bg="trueGray.900" color="white" height="68px">
         <Flex alignItems="center" pl={6}>
            <Link href="/" passHref>
               <chakra.a cursor="pointer">
                  <Wordmark />
               </chakra.a>
            </Link>
            <HStack ml={6}>
               <Link href="#">
                  <chakra.a px={3}>Guides</chakra.a>
               </Link>
            </HStack>
         </Flex>
      </Flex>
   );
}
