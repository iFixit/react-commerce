import { PixelPing } from '@components/analytics/PixelPing';

export const ProductPixelPing = ({ productcode }: { productcode: string }) => {
   return <PixelPing id={`ifixit/product/${productcode}/en`} />;
};
