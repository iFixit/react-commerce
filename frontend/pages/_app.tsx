import { AppProviders } from '@components/common';
import { AppProps } from 'next/app';
import * as React from 'react';
import NextNProgress from 'nextjs-progressbar';

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
      <AppProviders {...pageProps.appProps}>
         <NextNProgress />
         {getLayout(<Component {...pageProps} />, pageProps)}
      </AppProviders>
   );
}

export default MyApp;
