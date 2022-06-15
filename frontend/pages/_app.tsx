import { AppProviders } from '@components/common';
import { AppProps } from 'next/app';
import * as React from 'react';

type AppPropsWithLayout = AppProps & {
   Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
   const getLayout = Component.getLayout ?? ((page) => page);
   return (
      <AppProviders csrfToken={pageProps.csrfToken}>
         {getLayout(<Component {...pageProps} />, pageProps)}
      </AppProviders>
   );
}

export default MyApp;
