import * as React from 'react';

export type AppContext = {
   ifixitOrigin: string;
   csrfToken: string;
};

const AppContext = React.createContext<AppContext | null>(null);

type AppProviderProps = React.PropsWithChildren<{
   ifixitOrigin: string;
   csrfToken: string;
}>;

export function AppProvider({
   ifixitOrigin,
   csrfToken,
   children,
}: AppProviderProps) {
   const value = React.useMemo(
      (): AppContext => ({ ifixitOrigin, csrfToken }),
      [ifixitOrigin, csrfToken]
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
