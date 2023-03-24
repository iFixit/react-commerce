import { parseJSONMetafield } from '@helpers/storefront-helpers';
import { printZodError } from '@helpers/zod-helpers';
import { z } from 'zod';

const CompatibilityDeviceSchema = z.object({
   imageUrl: z.string(),
   deviceUrl: z.string(),
   deviceName: z.string(),
   variants: z.array(z.string().nullable()),
});

export type ProductDeviceCompatibility = z.infer<
   typeof ProductDeviceCompatibilitySchema
>;

export const ProductDeviceCompatibilitySchema = z.object({
   devices: z.array(CompatibilityDeviceSchema),
   hasMoreDevices: z.boolean(),
});

export function productDeviceCompatibilityFromMetafield(
   value: string | null | undefined
): ProductDeviceCompatibility | null {
   const rawJson = parseJSONMetafield(value);

   if (rawJson == null) return null;

   const result = ProductDeviceCompatibilitySchema.safeParse(rawJson);

   if (result.success) {
      const compatibility = result.data;
      compatibility.devices.forEach((device) => {
         device.variants = device.variants.filter(Boolean);
      });
      return compatibility;
   }
   printZodError(result.error, 'product device compatibility metafield');
   return null;
}
