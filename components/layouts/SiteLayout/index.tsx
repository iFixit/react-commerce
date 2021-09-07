import { Box, chakra, Flex, HStack, Menu } from '@chakra-ui/react';
import Head from 'next/head';
import Link from 'next/link';
import * as React from 'react';
import { Wordmark } from './Wordmark';

export type SiteLayoutProps = {
   title: string;
   footer: React.ReactNode;
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
   footer,
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
            {footer}
         </Flex>
      </Box>
   );
}
