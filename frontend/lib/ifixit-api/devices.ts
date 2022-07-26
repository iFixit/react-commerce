import { ABSOLUTE_IFIXIT_ORIGIN, RELATIVE_IFIXIT_ORIGIN } from '@config/env';

export type DeviceWiki = Record<string, any>;

export async function fetchDeviceWiki(
   deviceTitle: string
): Promise<DeviceWiki | null> {
   const deviceHandle = getDeviceHandle(deviceTitle);
   try {
      const response = await fetch(
         `${RELATIVE_IFIXIT_ORIGIN}/api/2.0/cart/part_collections/devices/${deviceHandle}`,
         {
            headers: {
               'Content-Type': 'application/json',
            },
         }
      );
      const payload = await response.json();
      return response.ok ? payload : null;
   } catch (error: any) {
      return null;
   }
}

export type MultipleDeviceApiResponse = {
   images: Record<string, string>;
};

export type GuideImageSize =
   | 'mini'
   | 'thumbnail'
   | '140x105'
   | '200x150'
   | 'standard'
   | '440x330'
   | 'medium'
   | 'large'
   | 'huge';

export function fetchMultipleDeviceImages(
   deviceTitles: string[],
   size: GuideImageSize
): Promise<MultipleDeviceApiResponse> {
   const apiUrl = new URL(
      `${ABSOLUTE_IFIXIT_ORIGIN}/api/2.0/wikis/topic_images`
   );
   apiUrl.searchParams.set('size', size);
   deviceTitles.forEach((deviceTitle) => {
      apiUrl.searchParams.append('t[]', deviceTitle);
   });
   return fetch(apiUrl.toString())
      .then((response) => response.json())
      .catch(() => ({ images: {} }));
}

/**
 * Convert product list device title to a URL friendly slug
 */
export function getDeviceHandle(deviceTitle: string): string {
   return deviceTitle.replace(/\s+/g, '_');
}
