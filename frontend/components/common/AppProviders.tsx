import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { IFIXIT_ORIGIN } from '@config/env';
import { AppProvider } from '@ifixit/app';
import { CartDrawerProvider, theme } from '@ifixit/ui';
import * as React from 'react';
import * as Sentry from '@sentry/nextjs';
import {
   MutationCache,
   QueryCache,
   QueryClient,
   QueryClientProvider,
} from 'react-query';
import { AlgoliaProps, InstantSearchProvider } from './InstantSearchProvider';

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

const shouldIgnoreUserAgent =
   typeof window !== 'undefined' && /Yeti/.test(window.navigator.userAgent);
const queryClientConfig = shouldIgnoreUserAgent
   ? undefined
   : {
        queryCache: new QueryCache({
           onError: (error, query) => {
              Sentry.captureException(error, (scope) => {
                 scope.setTag('react-query', 'query');
                 scope.setContext('Query', { queryKey: query.queryKey });
                 return scope;
              });
              console.error(error, query);
           },
        }),
        mutationCache: new MutationCache({
           onError: (error, variables, context, mutation) => {
              Sentry.captureException(error, (scope) => {
                 scope.setTag('react-query', 'mutation');
                 scope.setContext('Mutation', {
                    variables,
                    context,
                    mutationKey: mutation.options.mutationKey,
                 });
                 return scope;
              });
              console.error(error, variables, context, mutation);
           },
        }),
     };
const queryClient = new QueryClient(queryClientConfig);

export type WithProvidersProps<T> = T & { appProps: AppProvidersProps };

export type AppProvidersProps = {
   algolia?: AlgoliaProps;
};

export function AppProviders({
   children,
   algolia,
}: React.PropsWithChildren<AppProvidersProps>) {
   const markup = (
      <ChakraProvider theme={customTheme}>{children}</ChakraProvider>
   );

   return (
      <AppProvider ifixitOrigin={IFIXIT_ORIGIN}>
         <CartDrawerProvider>
            <QueryClientProvider client={queryClient}>
               {algolia ? (
                  <InstantSearchProvider {...algolia}>
                     {markup}
                  </InstantSearchProvider>
               ) : (
                  markup
               )}
            </QueryClientProvider>
         </CartDrawerProvider>
      </AppProvider>
   );
}
