import { chakra, Flex } from '@chakra-ui/react';
import { LayoutData } from '@lib/api';
import NextLink from 'next/link';
import * as React from 'react';
import { Navigation } from './Navigation';
import { SearchBar } from './SearchBar';
import { Wordmark } from './Wordmark';

export interface HeaderProps {
   data: LayoutData['header'];
}

export function Header({ data }: HeaderProps) {
   return (
      <Flex bg="trueGray.900" color="white" height="68px">
         <Flex alignItems="center" pl={6}>
            <NextLink href="/" passHref>
               <chakra.a cursor="pointer">
                  <Wordmark />
               </chakra.a>
            </NextLink>
            {data.menu && <Navigation menu={data.menu} />}
            <SearchBar />
         </Flex>
      </Flex>
   );
}
