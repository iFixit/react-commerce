import { PIXEL_PING_URL } from '@config/env';

export const PixelPing = ({ productcode }: { productcode: string }) => {
   if (!PIXEL_PING_URL) {
      return null;
   }
   const key = `ifixit/product/${productcode}/en`;
   const url = `${PIXEL_PING_URL}?key=${encodeURIComponent(key)}`;
   return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={url} width="1" height="1" alt="" style={{ display: 'none' }} />
   );
};
