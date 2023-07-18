import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { IFIXIT_ORIGIN } from '@config/env';
import { AppProvider } from '@ifixit/app';
import { CartDrawerProvider, theme } from '@ifixit/ui';
import * as Sentry from '@sentry/nextjs';
import {
   MutationCache,
   QueryCache,
   QueryClient,
   QueryClientProvider,
} from '@tanstack/react-query';
import * as React from 'react';
import { AlgoliaProps, InstantSearchProvider } from './InstantSearchProvider';
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';

const customTheme = extendTheme(theme);

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
                    variables: JSON.stringify(variables, null, 2),
                    context: JSON.stringify(context, null, 2),
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
   ifixitOrigin?: string;
   adminMessage?: string;
   messages: AbstractIntlMessages;
};

export function AppProviders({
   messages,
   children,
   algolia,
   ifixitOrigin,
   adminMessage,
}: React.PropsWithChildren<AppProvidersProps>) {
   const markup = (
      <ChakraProvider theme={customTheme}>{children}</ChakraProvider>
   );

   console.log('messages: ', messages);

   return (
      <AppProvider
         ifixitOrigin={ifixitOrigin ?? IFIXIT_ORIGIN}
         adminMessage={adminMessage}
      >
         <NextIntlClientProvider messages={messages}>
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
         </NextIntlClientProvider>
      </AppProvider>
   );
}
