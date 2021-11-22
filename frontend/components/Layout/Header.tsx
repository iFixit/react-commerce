import { chakra, Flex, HStack } from '@chakra-ui/react';
import { LayoutData } from '@lib/api';
import Link from 'next/link';
import * as React from 'react';
import { Wordmark } from './Wordmark';

export interface HeaderProps {
   data: LayoutData['header'];
}

export function Header({ data }: HeaderProps) {
   console.log('Header data', data);
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
                  <chakra.a px={3}>Fix Your Stuff</chakra.a>
               </Link>
            </HStack>
         </Flex>
      </Flex>
   );
}
