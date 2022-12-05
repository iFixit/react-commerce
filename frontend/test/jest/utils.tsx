import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { AppProvider } from '@ifixit/app';

export const GlobalContextProvider = ({
   // @ts-ignore
   children,
   ifixitOrigin = 'www.cominor.com',
}) => {
   return <AppProvider ifixitOrigin={ifixitOrigin}>{children}</AppProvider>;
};

export const renderWithAppContext = (
   ui: any,
   options?: RenderOptions
): RenderResult => render(ui, { wrapper: GlobalContextProvider, ...options });
