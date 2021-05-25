import * as React from 'react';
import { SearchContext, AlgoliaProviderProps } from './types';
import { useSearchContextValue } from './useSearchContextValue';

const Context = React.createContext<SearchContext | null>(null);

export function AlgoliaProvider(
   props: React.PropsWithChildren<AlgoliaProviderProps>
) {
   const value = useSearchContextValue(props);

   return <Context.Provider value={value}>{props.children}</Context.Provider>;
}

export function useSearchContext<Hit = any>(): SearchContext<Hit> {
   const value = React.useContext(Context);
   if (value == null) {
      throw new Error("can't use useSearch without SearchProvider");
   }
   return value;
}
