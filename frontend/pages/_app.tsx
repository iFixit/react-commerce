import { AppProviders } from '@components/common';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { applySentryFetchMiddleware } from '@ifixit/sentry';
import { ServerSidePropsProvider } from '@lib/server-side-props';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import { useState } from 'react';
// Improve FontAwesome integration with Next.js https://fontawesome.com/v5/docs/web/use-with/react#next-js
config.autoAddCss = false;

applySentryFetchMiddleware();

type AppPropsWithLayout<P> = AppProps<P> & {
   Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout<any>) {
   const [mswState, setMswState] = useState<'unused' | 'loading' | 'ready'>(
      'unused'
   );

   if (process.env.NEXT_PUBLIC_MOCK_API === 'true' && mswState === 'unused') {
      setMswState('loading');
      import('@tests/playwright/msw')
         .then(({ setupMocks }) => {
            setupMocks();
         })
         .then(() => setMswState('ready'));
   }

   if (mswState === 'loading') {
      return <div>Loading MSW Worker...</div>;
   }

   const getLayout = Component.getLayout ?? ((page) => page);

   return (
      <ServerSidePropsProvider props={pageProps}>
         <AppProviders {...pageProps.appProps}>
            <NextNProgress showOnShallow={false} />
            {getLayout(<Component {...pageProps} />, pageProps)}
         </AppProviders>
         <SpeedInsights sampleRate={0.2} />
      </ServerSidePropsProvider>
   );
}

export default MyApp;
