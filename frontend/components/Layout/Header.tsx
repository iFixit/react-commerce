import { Box, Button, Flex, Icon, IconButton } from '@chakra-ui/react';
import { DEFAULT_ANIMATION_DURATION_MS } from '@config/constants';
import { LayoutData } from '@lib/api';
import NextLink from 'next/link';
import * as React from 'react';
import { RiSearchLine } from 'react-icons/ri';
import { Navigation } from './Navigation';
import { SearchForm, SearchInput } from './SearchBar';
import { UserMenu } from './User';
import { Wordmark } from './Wordmark';

export interface HeaderProps {
   data: LayoutData['header'];
}

export function Header({ data }: HeaderProps) {
   const [isMobileSearchOpen, setIsMobileSearchOpen] = React.useState(false);
   const mobileSearchInputRef = React.useRef<HTMLInputElement>(null);

   React.useEffect(() => {
      if (isMobileSearchOpen) {
         mobileSearchInputRef.current?.focus();
      }
   }, [isMobileSearchOpen]);

   return (
      <>
         <Box height="header"></Box>
         <Flex
            as="header"
            bg="trueGray.900"
            color="white"
            position="absolute"
            top="0"
            left="0"
            right="0"
            height="header"
            zIndex="header"
            overflow={{
               base: 'hidden',
               lg: 'visible',
            }}
            direction="column"
            px={{
               base: '0',
               lg: '3',
            }}
         >
            <Flex
               height="header"
               flexShrink="0"
               transition={`transform ${DEFAULT_ANIMATION_DURATION_MS}ms`}
               transform={
                  isMobileSearchOpen ? 'translateY(0)' : 'translateY(-100%)'
               }
               display={{
                  base: 'flex',
                  md: 'none',
               }}
               align="center"
               pl="7"
               pr="4"
            >
               <SearchForm
                  mr="1"
                  display={{
                     base: 'block',
                     md: 'none',
                  }}
                  flexGrow={1}
               >
                  <SearchInput ref={mobileSearchInputRef} />
               </SearchForm>
               <Button
                  variant="ghost"
                  _hover={{
                     bg: 'trueGray.800',
                  }}
                  _active={{
                     bg: 'trueGray.800',
                  }}
                  mb="-1px"
                  fontSize="sm"
                  fontWeight="normal"
                  onClick={() => setIsMobileSearchOpen(false)}
               >
                  Cancel
               </Button>
            </Flex>
            <Flex
               alignItems="center"
               height="header"
               flexShrink="0"
               w="full"
               maxW={{
                  base: '1400px',
               }}
               mx="auto"
               transition={`transform ${DEFAULT_ANIMATION_DURATION_MS}ms`}
               transform={{
                  base: isMobileSearchOpen
                     ? 'translateY(0)'
                     : 'translateY(-100%)',
                  md: 'initial',
               }}
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
               <SearchForm
                  mx="8"
                  display={{
                     base: 'none',
                     md: 'block',
                  }}
                  flexGrow={1}
               >
                  <SearchInput />
               </SearchForm>
               <Box
                  display={{
                     base: 'block',
                     md: 'none',
                  }}
                  flexGrow={1}
               />
               <Flex>
                  <IconButton
                     aria-label="Search database"
                     variant="ghost"
                     display={{
                        base: 'block',
                        md: 'none',
                     }}
                     _hover={{
                        bg: 'trueGray.800',
                     }}
                     _active={{
                        bg: 'trueGray.800',
                     }}
                     icon={<Icon as={RiSearchLine} color="white" />}
                     onClick={() => setIsMobileSearchOpen(true)}
                  />
                  <UserMenu />
               </Flex>
            </Flex>
         </Flex>
      </>
   );
}
