import * as React from "react";

export type AppContext = {
  ifixitOrigin: string;
};

const AppContext = React.createContext<AppContext | null>(null);

type AppProviderProps = React.PropsWithChildren<{
  ifixitOrigin: string;
}>;

export function AppProvider({ ifixitOrigin, children }: AppProviderProps) {
  const value = React.useMemo(
    (): AppContext => ({ ifixitOrigin }),
    [ifixitOrigin]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = React.useContext(AppContext);
  if (context === null) {
    throw new Error("useAppContext must be used within a AppProvider");
  }
  return context;
}
