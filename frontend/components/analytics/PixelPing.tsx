import { PIXEL_PING_URL } from '@config/env';

export const PixelPing = ({
   type,
   id,
   site = 'ifixit',
   lang = 'en',
}: {
   type: string;
   id: number;
   site?: string;
   lang?: string;
}) => {
   if (!PIXEL_PING_URL) {
      return null;
   }

   const intId = Math.trunc(id);
   const key = `${site}/${type}/${intId}/${lang}`;
   const url = `${PIXEL_PING_URL}?key=${encodeURIComponent(key)}`;
   return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={url} width="1" height="1" alt="" style={{ display: 'none' }} />
   );
};
