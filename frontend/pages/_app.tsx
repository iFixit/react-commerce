import { AppProviders } from '@components/common';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { LoaderDataProvider } from '@lib/loader-data';
import { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
// Improve FontAwesome integration with Next.js https://fontawesome.com/v5/docs/web/use-with/react#next-js
config.autoAddCss = false;

type AppPropsWithLayout = AppProps & {
   Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
   const getLayout = Component.getLayout ?? ((page) => page);
   return (
      <LoaderDataProvider pageProps={pageProps}>
         <AppProviders {...pageProps.appProps}>
            <NextNProgress />
            {getLayout(<Component {...pageProps} />, pageProps)}
         </AppProviders>
      </LoaderDataProvider>
   );
}

export default MyApp;
