import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import { theme } from '@ifixit/react-components';
import * as React from 'react';
import Head from 'next/head';

const customTheme = extendTheme(theme);

function MyApp({ Component, pageProps }: AppProps) {
   return (
      <>
         <Head>
            <link
               href="https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap"
               rel="stylesheet"
            />
         </Head>
         <ChakraProvider theme={customTheme}>
            <Component {...pageProps} />
         </ChakraProvider>
      </>
   );
}

export default MyApp;
