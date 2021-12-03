import { Box, Flex } from '@chakra-ui/react';
import { LayoutData } from '@lib/api';
import Head from 'next/head';
import * as React from 'react';
import { Footer } from './Footer';
import { Header } from './Header';

export interface LayoutProps {
   title: string;
   footer: LayoutData['footer'];
}

export function Layout({
   title,
   footer,
   children,
}: React.PropsWithChildren<LayoutProps>) {
   return (
      <Box>
         <Head>
            <title>{title}</title>
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <Flex direction="column">
            <Header />
            {children}
            <Footer data={footer} />
         </Flex>
      </Box>
   );
}
