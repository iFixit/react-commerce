import {
   Box,
   Divider,
   Flex,
   forwardRef,
   Link,
   LinkProps,
} from '@chakra-ui/react';
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
      <>
         <Box height="header"></Box>
         <Flex
            as="header"
            bg="trueGray.900"
            color="white"
            height="header"
            position="absolute"
            top="0"
            left="0"
            right="0"
            zIndex="header"
         >
            <Flex
               alignItems="center"
               w="full"
               maxW={{
                  base: '1400px',
               }}
               mx="auto"
            >
               {data.menu && <Navigation.Mobile menu={data.menu} />}
               <NextLink href="/" passHref>
                  <Flex as="a" cursor="pointer" h="full" align="center" pr="4">
                     <Wordmark />
                  </Flex>
               </NextLink>
               {data.menu && (
                  <Navigation.Desktop
                     menu={data.menu}
                     display={{ base: 'none', lg: 'block' }}
                  />
               )}
               <SearchBar mx="8" flexGrow={1} />
               <Flex>
                  <Flex fontSize="sm" fontWeight="normal" align="center">
                     <NavLink href="https://www.ifixit.com/Login/register">
                        Join
                     </NavLink>
                     <Divider
                        orientation="vertical"
                        borderColor="trueGray.700"
                        h="6"
                     />
                     <NavLink href="https://www.ifixit.com/login">
                        Log In
                     </NavLink>
                  </Flex>
               </Flex>
            </Flex>
         </Flex>
      </>
   );
}

export const NavLink = forwardRef<LinkProps, 'a'>((props, ref) => {
   return (
      <Link
         ref={ref}
         href="#"
         px="4"
         py="2"
         h="full"
         transition="color 300ms"
         _hover={{
            textDecoration: 'none',
            color: 'brand.300',
         }}
         {...props}
      />
   );
});
