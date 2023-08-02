import { AppProviders } from '@components/common';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { AppProps } from 'next/app';

// Improve FontAwesome integration with Next.js https://fontawesome.com/v5/docs/web/use-with/react#next-js
config.autoAddCss = false;

type AppPropsWithLayout<P> = AppProps<P> & {
   Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout<any>) {
   const getLayout = Component.getLayout ?? ((page) => page);

   return (
      <>
         <AppProviders {...pageProps.appProps}>
            {getLayout(<Component {...pageProps} />, pageProps)}
         </AppProviders>
      </>
   );
}

export default MyApp;
