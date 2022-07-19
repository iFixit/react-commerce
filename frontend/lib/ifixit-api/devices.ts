import { IFixitAPIClient } from '@ifixit/ifixit-api-client';

export type DeviceWiki = Record<string, any>;

export async function fetchDeviceWiki(
   client: IFixitAPIClient,
   deviceTitle: string
): Promise<DeviceWiki | null> {
   const deviceHandle = getDeviceHandle(deviceTitle);
   try {
      const response = await client.get(`wikis/CATEGORY/${deviceHandle}`, {
         headers: {
            'Content-Type': 'application/json',
         },
      });
      const payload = await response.json();
      return payload;
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
