import { PixelPing } from '@components/analytics/PixelPing';

export const ProductPixelPing = ({ productcode }: { productcode: number }) => {
   return <PixelPing id={productcode} type="product" />;
};
