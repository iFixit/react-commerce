import { screen } from '@testing-library/react';
import { CompatibleDevice } from '@components/common';
import { renderWithAppContext } from '../utils';
import { getMockProduct } from '../__mocks__/products';

describe('CompatibleDevice', () => {
   it('renders and matches the snapshot', () => {
      const product = getMockProduct();
      const device = product!.compatibility!.devices[0];

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
      const product = getMockProduct();
      const device = product!.compatibility!.devices[0];
      expect(device.variants.length).toBeGreaterThan(2);

      // @ts-ignore
      const { asFragment } = renderWithAppContext(
         <CompatibleDevice device={device} maxModelLines={1} />
      );

      (expect(screen.queryByText(/And \d more.../i)) as any).toBeVisible();
      (expect(asFragment()) as any).toMatchSnapshot();
   });
});
