import * as React from 'react';

export type AppContext = {
   relativeIfixitOrigin: string;
   absoluteIfixitOrigin: string;
};

const AppContext = React.createContext<AppContext | null>(null);

type AppProviderProps = React.PropsWithChildren<{
   relativeIfixitOrigin: string;
   absoluteIfixitOrigin: string;
}>;

export function AppProvider({
   relativeIfixitOrigin,
   absoluteIfixitOrigin,
   children,
}: AppProviderProps) {
   const value = React.useMemo(
      (): AppContext => ({ relativeIfixitOrigin, absoluteIfixitOrigin }),
      [relativeIfixitOrigin, absoluteIfixitOrigin]
   );

   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
   const context = React.useContext(AppContext);
   if (context === null) {
      throw new Error('useAppContext must be used within a AppProvider');
   }
   return context;
}
