import { AppProviders } from '@components/AppProviders';
import { render, RenderOptions } from '@testing-library/react';

const customRender = (
   ui: React.ReactElement,
   options?: Omit<RenderOptions, 'queries'>
) => render(ui, { wrapper: AppProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
