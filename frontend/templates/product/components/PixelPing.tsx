import { PixelPing as PixelPingComponent } from '@components/analytics/PixelPing';

export const PixelPing = ({ productcode }: { productcode: string }) => {
   return (
      // eslint-disable-next-line @next/next/no-img-element
      <PixelPingComponent id={`ifixit/product/${productcode}/en`} />
   );
};
