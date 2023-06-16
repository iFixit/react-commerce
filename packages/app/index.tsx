import * as React from 'react';

export type AppContext = {
   ifixitOrigin: string;
   adminMessage?: string;
};

const AppContext = React.createContext<AppContext | null>(null);

type AppProviderProps = React.PropsWithChildren<{
   ifixitOrigin: string;
   adminMessage?: string;
}>;

export function AppProvider({
   ifixitOrigin,
   adminMessage,
   children,
}: AppProviderProps) {
   const value = React.useMemo(
      (): AppContext => ({
         ifixitOrigin,
         adminMessage,
      }),
      [ifixitOrigin, adminMessage]
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
