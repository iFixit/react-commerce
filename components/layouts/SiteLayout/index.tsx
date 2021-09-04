import {
   Box,
   chakra,
   Divider,
   Flex,
   HStack,
   Img,
   Menu,
   MenuList,
   SimpleGrid,
   Stack,
} from '@chakra-ui/react';
import {
   CountryCode,
   FacebookLogo,
   FlagIcon,
   Footer,
   FooterLink,
   FooterMenuItem,
   FooterMenuLink,
   FooterMenuList,
   FooterPartnerLink,
   Globe,
   InstagramLogo,
   RepairOrgLogo,
   StoreCurrency,
   StoreFlagBackdrop,
   StoreMenuButton,
   StoreMenuItem,
   StoreName,
   TwitterLogo,
   YoutubeLogo,
} from '@ifixit/react-components';
import Head from 'next/head';
import Link from 'next/link';
import * as React from 'react';
import { Wordmark } from './Wordmark';
import links from './links.json';
import partners from './partners.json';
import stores from './stores.json';

export type SiteLayoutProps = {
   title: string;
};

export interface PageSettings {
   socialMediaAccounts: {
      twitter?: string;
      facebook?: string;
      instagram?: string;
      youtube?: string;
      repairOrg?: string;
   };
   footer: {
      menu1: Menu;
      menu2: Menu;
      bottomMenu: Menu;
      partners: PartnerItem[];
   };
}

interface Menu {
   title: string;
   items: MenuItem[];
}

interface MenuItem {
   name: string;
   url: string;
}

interface PartnerItem {
   id: string;
   name: string;
   url: string;
   logoImageUrl: string;
}

export function SiteLayout({
   children,
   title,
}: React.PropsWithChildren<SiteLayoutProps>) {
   return (
      <Box>
         <Head>
            <title>{title}</title>
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <Flex direction="column">
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
            {children}
            <Footer>
               <SimpleGrid
                  columns={{
                     base: 1,
                     sm: 3,
                     lg: 4,
                  }}
                  spacing="4"
                  px={{
                     base: 5,
                     sm: 10,
                  }}
                  py="10"
                  autoFlow="row"
               >
                  {links.map((linklist, index) => (
                     <FooterMenuList key={index}>
                        {linklist.map((link) => {
                           return (
                              <FooterMenuItem key={link.label}>
                                 <FooterMenuLink href={link.url}>
                                    {link.label}
                                 </FooterMenuLink>
                              </FooterMenuItem>
                           );
                        })}
                     </FooterMenuList>
                  ))}
                  <FooterMenuList>
                     <FooterMenuItem>
                        <FooterMenuLink href="#" icon={FacebookLogo}>
                           Facebook
                        </FooterMenuLink>
                     </FooterMenuItem>
                     <FooterMenuItem>
                        <FooterMenuLink href="#" icon={TwitterLogo}>
                           Twitter
                        </FooterMenuLink>
                     </FooterMenuItem>
                     <FooterMenuItem>
                        <FooterMenuLink href="#" icon={InstagramLogo}>
                           Instagram
                        </FooterMenuLink>
                     </FooterMenuItem>
                     <FooterMenuItem>
                        <FooterMenuLink href="#" icon={YoutubeLogo}>
                           Youtube
                        </FooterMenuLink>
                     </FooterMenuItem>
                     <FooterMenuItem>
                        <FooterMenuLink href="#" icon={RepairOrgLogo}>
                           Repair.org
                        </FooterMenuLink>
                     </FooterMenuItem>
                  </FooterMenuList>
                  <SimpleGrid
                     columns={3}
                     spacing="4"
                     gridColumnEnd={{
                        sm: 'span 3',
                        lg: 'auto',
                     }}
                  >
                     {partners.map((partner) => {
                        return (
                           <FooterPartnerLink key={partner.name} href="#">
                              <Img
                                 h="full"
                                 mx="auto"
                                 objectFit="contain"
                                 src={partner.logo}
                                 alt={partner.name}
                              />
                           </FooterPartnerLink>
                        );
                     })}
                  </SimpleGrid>
               </SimpleGrid>
               <Divider borderColor="trueGray.700" />
               <SimpleGrid
                  columns={{
                     base: 1,
                     lg: 2,
                  }}
                  py="6"
                  px={{
                     base: 5,
                     sm: 10,
                  }}
                  spacing={{
                     base: 10,
                  }}
               >
                  <Stack
                     direction={{
                        base: 'row',
                     }}
                     spacing={{
                        base: 2,
                        sm: 12,
                     }}
                     justify={{
                        base: 'space-between',
                        sm: 'center',
                        lg: 'flex-start',
                     }}
                  >
                     <Menu isLazy lazyBehavior="keepMounted">
                        <StoreMenuButton
                           icon={
                              <StoreFlagBackdrop>
                                 <FlagIcon code={CountryCode.US} />
                              </StoreFlagBackdrop>
                           }
                        >
                           Region
                        </StoreMenuButton>
                        <MenuList>
                           {stores.map((store) => {
                              return (
                                 <StoreMenuItem
                                    key={store.code}
                                    as="a"
                                    href={store.url}
                                 >
                                    <FlagIcon
                                       code={store.code.toUpperCase() as any}
                                    />
                                    <StoreName>{store.name}</StoreName>
                                    <StoreCurrency>
                                       {store.currency}
                                    </StoreCurrency>
                                 </StoreMenuItem>
                              );
                           })}
                        </MenuList>
                     </Menu>
                     <FooterLink href="#" icon={Globe}>
                        Help translate
                     </FooterLink>
                  </Stack>
                  <Stack
                     justify={{
                        base: 'flex-start',
                        sm: 'center',
                        lg: 'flex-end',
                     }}
                     direction={{
                        base: 'column',
                        sm: 'row',
                     }}
                     spacing={{
                        base: 2,
                        sm: 4,
                     }}
                  >
                     <FooterLink href="#">
                        Licensed under creative commons
                     </FooterLink>
                     <Divider
                        opacity={{
                           base: 1,
                           sm: 1,
                        }}
                        orientation="vertical"
                        borderColor="trueGray.700"
                     />
                     <FooterLink href="#">Privacy</FooterLink>
                     <Divider
                        opacity={{
                           base: 1,
                           sm: 1,
                        }}
                        orientation="vertical"
                        borderColor="trueGray.700"
                     />
                     <FooterLink href="#">Legal</FooterLink>
                  </Stack>
               </SimpleGrid>
            </Footer>
         </Flex>
      </Box>
   );
}
