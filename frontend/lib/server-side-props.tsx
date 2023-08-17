'use client';

/**
 * This lib is inspired by Remix's loader data pattern.
 * The purpose of this lib is to make it easy for components to reach for page wide data,
 * such as the current Shopify store details, or other global settings.
 * The provider wraps the entire Next.js app and make page props available
 * to every component via React context.
 * The generic hook let us create type-safe hooks for every page/template, e.g.:
 *
 * export const useProductTemplateProps = () => useServerSideProps<ProductTemplateProps>();
 *
 */
import React from 'react';

const ServerSidePropsContext = React.createContext<any>(null);

type ServerSidePropsProviderProps = React.PropsWithChildren<{
   props: any;
}>;

export function ServerSidePropsProvider({
   props,
   children,
}: ServerSidePropsProviderProps) {
   return (
      <ServerSidePropsContext.Provider value={props}>
         {children}
      </ServerSidePropsContext.Provider>
   );
}

export function useServerSideProps<Props>() {
   return React.useContext<Props>(ServerSidePropsContext);
}
