import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { IFIXIT_ORIGIN } from '@config/env';
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
   styles: {
      global: {
         body: {
            touchAction: 'pan-x pan-y',
         },
      },
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
               href={`${IFIXIT_ORIGIN}/api/2.0/user`}
               as="fetch"
            />
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
            />
         </Head>
         <ChakraProvider theme={customTheme}>{children}</ChakraProvider>
      </>
   );
}
