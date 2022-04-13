import * as React from "react";

export type Context = {
  hiddenBar: {
    isOpen: boolean;
    open: () => void;
    close: () => void;
  };
  navigation: {
    isOpen: boolean;
    toggleButtonRef: React.RefObject<HTMLButtonElement>;
    toggle: () => void;
    close: () => void;
  };
};

export const HeaderContext = React.createContext<Context | null>(null);

export const useHeaderContext = () => {
  const context = React.useContext(HeaderContext);
  if (!context) {
    throw new Error("useHeaderContext must be used within a Header");
  }
  return context;
};
