import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { theme } from '@ifixit/react-components';
import Head from 'next/head';
import * as React from 'react';

const customTheme = extendTheme(theme);

export function AppProviders({ children }: React.PropsWithChildren<any>) {
   return (
      <>
         <Head>
            <link
               href="https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap"
               rel="stylesheet"
            />
         </Head>
         <ChakraProvider theme={customTheme}>{children}</ChakraProvider>
      </>
   );
}
