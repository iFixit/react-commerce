import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { IFIXIT_ORIGIN } from '@config/env';
import { theme } from '@ifixit/react-components';
import Head from 'next/head';
import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

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

const queryClient = new QueryClient();

export function AppProviders({ children }: React.PropsWithChildren<any>) {
   return (
      <QueryClientProvider client={queryClient}>
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
         </Head>
         <ChakraProvider theme={customTheme}>{children}</ChakraProvider>
      </QueryClientProvider>
   );
}
