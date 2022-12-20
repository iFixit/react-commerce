import { screen } from '@testing-library/react';
import { CompatibleDevice } from '@components/common';
import { renderWithAppContext } from '../utils';
import { getMockProduct } from '../utils';

describe('CompatibleDevice', () => {
   it('renders and matches the snapshot', () => {
      let product = getMockProduct();
      let device = product!.compatibility!.devices[0];

      // @ts-ignore
      const { asFragment } = renderWithAppContext(
         <CompatibleDevice device={device} />
      );

      (
         expect(screen.queryByText(/other models.../i)) as any
      ).not.toBeInTheDocument();
      (expect(asFragment()) as any).toMatchSnapshot();
   });

   it('renders and matches the snapshot with truncated variants', async () => {
      let product = getMockProduct();
      let device = product!.compatibility!.devices[0];

      // @ts-ignore
      const { asFragment } = renderWithAppContext(
         <CompatibleDevice device={device} truncate={1} />
      );

      (expect(screen.queryByText(/other models.../i)) as any).toBeVisible();
      (expect(asFragment()) as any).toMatchSnapshot();
   });
});
