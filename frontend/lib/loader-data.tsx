/**
 * This lib is inspired by Remix's loader data pattern.
 * The purpose of this lib is to make it easy for components to reach for page wide data,
 * such as the current Shopify store details, or other global settings.
 * The provider wraps the entire Next.js app and make page props available
 * to every component via React context.
 * The generic hook let us create type-safe hooks for every page/template, e.g.:
 *
 * export const useProductTemplateData = () => useLoaderData<ProductTemplateProps>();
 *
 */
import React from 'react';

const LoaderDataContext = React.createContext<any>(null);

type LoaderDataProviderProps = React.PropsWithChildren<{
   pageProps: any;
}>;

export function LoaderDataProvider({
   pageProps,
   children,
}: LoaderDataProviderProps) {
   return (
      <LoaderDataContext.Provider value={pageProps}>
         {children}
      </LoaderDataContext.Provider>
   );
}

export function useLoaderData<Data>() {
   return React.useContext<Data>(LoaderDataContext);
}
