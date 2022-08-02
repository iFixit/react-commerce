import { IFixitAPIClient } from '@ifixit/ifixit-api-client';
import { invariant } from '@ifixit/helpers';

export type DeviceWiki = Record<string, any>;

export async function fetchDeviceWiki(
   client: IFixitAPIClient,
   deviceTitle: string
): Promise<DeviceWiki | null> {
   const deviceHandle = getDeviceHandle(deviceTitle);
   try {
      invariant(
         deviceHandle.length > 0,
         'deviceHandle cannot be a blank string'
      );
      const response = await client.get(
         `cart/part_collections/devices/${deviceHandle}`
      );
      if (!response.ok) {
         return null;
      }
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
   client: IFixitAPIClient,
   deviceTitles: string[],
   size: GuideImageSize
): Promise<MultipleDeviceApiResponse> {
   const params = new URLSearchParams();
   params.set('size', size);
   deviceTitles.forEach((deviceTitle) => {
      params.append('t[]', deviceTitle);
   });
   return client
      .get(`wikis/topic_images?` + params.toString())
      .then((response) => response.json())
      .catch(() => ({ images: {} }));
}

/**
 * Convert product list device title to a URL friendly slug
 */
export function getDeviceHandle(deviceTitle: string): string {
   return deviceTitle.replace(/\s+/g, '_');
}
