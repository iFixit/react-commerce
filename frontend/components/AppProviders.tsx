import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { IFIXIT_API_ORIGIN } from '@config/env';
import { theme } from '@ifixit/react-components';
import Head from 'next/head';
import * as React from 'react';

const customTheme = extendTheme({
   ...theme,
   sizes: {
      ...theme.sizes,
      header: '68px',
   },
   zIndices: {
      ...theme.zIndices,
      header: 2000,
   },
});

export function AppProviders({ children }: React.PropsWithChildren<any>) {
   return (
      <>
         <Head>
            <link
               href="https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap"
               rel="stylesheet"
            />
            <link
               rel="prefetch"
               href={`${IFIXIT_API_ORIGIN}/api/2.0/user`}
               as="fetch"
            />
         </Head>
         <ChakraProvider theme={customTheme}>{children}</ChakraProvider>
      </>
   );
}
