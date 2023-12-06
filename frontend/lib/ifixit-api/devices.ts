import { IFixitAPIClient } from '@ifixit/ifixit-api-client';
import { invariant } from '@ifixit/helpers';
import { stylizeDeviceItemType } from '@helpers/product-list-helpers';
import { z } from 'zod';

export type DeviceWiki = Record<string, any>;

export async function fetchDeviceWiki(
   client: IFixitAPIClient,
   deviceTitle: string
): Promise<DeviceWiki | null> {
   const deviceHandle = encodeURIComponent(stylizeDeviceItemType(deviceTitle));
   try {
      invariant(
         deviceHandle.length > 0,
         'deviceHandle cannot be a blank string'
      );
      return await client.get(
         `cart/part_collections/devices/${deviceHandle}`,
         'device-wiki'
      );
   } catch (error: any) {
      return null;
   }
}

export type MultipleDeviceApiResponse = z.infer<
   typeof MultipleDeviceApiResponseSchema
>;

const MultipleDeviceApiResponseSchema = z.object({
   images: z.record(z.string()),
});

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

export async function fetchMultipleDeviceImages(
   client: IFixitAPIClient,
   deviceTitles: string[],
   size: GuideImageSize
): Promise<MultipleDeviceApiResponse> {
   const params = new URLSearchParams();
   params.set('size', size);
   deviceTitles.forEach((deviceTitle) => {
      params.append('t[]', deviceTitle);
   });
   try {
      const result = await client.get(
         `wikis/topic_images?` + encodeURIComponent(params.toString()),
         'device-images'
      );
      return MultipleDeviceApiResponseSchema.parse(result);
   } catch (error) {
      console.error(error);
      return { images: {} };
   }
}
