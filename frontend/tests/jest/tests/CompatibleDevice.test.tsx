import { CompatibleDevice } from '@components/common';
import { renderWithAppContext } from '../utils';
import { getMockProduct } from '../utils';

describe('CompatibleDevice', () => {
   it('renders and matches the snapshot', () => {
      let product = getMockProduct();
      let device = product.compatibility.devices[0];

      // @ts-ignore
      const { getByText, asFragment } = renderWithAppContext(
         <CompatibleDevice device={device} />
      );
      expect(() => getByText(/other models.../i)).toThrow();
      (expect(asFragment()) as any).toMatchSnapshot();
   });

   it('renders and matches the snapshot with truncated variants', async () => {
      let product = getMockProduct();
      let device = product.compatibility.devices[0];

      // @ts-ignore
      const { getByText, asFragment } = renderWithAppContext(
         <CompatibleDevice device={device} truncate={1} />
      );

      expect(getByText(/other models.../i)).toBeTruthy();
      (expect(asFragment()) as any).toMatchSnapshot();
   });
});
