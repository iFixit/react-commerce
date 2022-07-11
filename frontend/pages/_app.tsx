import { AppProviders } from '@components/common';
import { AppProps } from 'next/app';
import * as React from 'react';
import NextNProgress from 'nextjs-progressbar';

type AppPropsWithLayout = AppProps & {
   Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
   const getLayout = Component.getLayout ?? ((page) => page);
   return (
      <AppProviders {...pageProps.appProps}>
         <NextNProgress />
         {getLayout(<Component {...pageProps} />, pageProps)}
      </AppProviders>
   );
}

export default MyApp;
