import { PixelPing } from '@components/analytics/PixelPing';

export const ProductPixelPing = ({ productcode }: { productcode: string }) => {
   return (
      // eslint-disable-next-line @next/next/no-img-element
      <PixelPing id={`ifixit/product/${productcode}/en`} />
   );
};
