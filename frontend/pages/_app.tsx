import { AppProviders } from '@components/common';
import { AppProps } from 'next/app';
import * as React from 'react';
import NextNProgress from 'nextjs-progressbar';
import Head from 'next/head';
// Improve FontAwesome integration with Next.js https://fontawesome.com/v5/docs/web/use-with/react#next-js
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

type AppPropsWithLayout = AppProps & {
   Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
   const getLayout = Component.getLayout ?? ((page) => page);
   return (
      <>
         <Head>
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
            />
         </Head>
         <AppProviders {...pageProps.appProps}>
            <NextNProgress />
            {getLayout(<Component {...pageProps} />, pageProps)}
         </AppProviders>
      </>
   );
}

export default MyApp;
