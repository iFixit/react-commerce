import { IFIXIT_ORIGIN } from '@config/env';
import { getDeviceHandle } from '@models/product-list';

export type DeviceWiki = Record<string, any>;

export async function fetchDeviceWiki(
   deviceTitle: string
): Promise<DeviceWiki | null> {
   const deviceHandle = getDeviceHandle(deviceTitle);
   try {
      const response = await fetch(
         `${IFIXIT_ORIGIN}/api/2.0/wikis/CATEGORY/${deviceHandle}`,
         {
            headers: {
               'Content-Type': 'application/json',
            },
         }
      );
      const payload = await response.json();
      return payload;
   } catch (error: any) {
      return null;
   }
}
