import { AppProviders } from '@components/AppProviders';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import * as React from 'react';

type NextPageWithLayout = NextPage & {
   getLayout?: (page: React.ReactElement, pageProps: any) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
   Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
   const getLayout = Component.getLayout ?? ((page) => page);
   return (
      <AppProviders>
         {getLayout(<Component {...pageProps} />, pageProps)}
      </AppProviders>
   );
}

export default MyApp;
