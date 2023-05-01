import { Link } from '@chakra-ui/react';
import { CompatibleDevice } from '@components/common';
import type { Product } from '@pages/api/nextjs/cache/product';

export type CompatibleDevicesProps = {
   product: Product;
};

const MAX_VISIBLE_DEVICES = 3;
const MAX_MODEL_LINES_PER_DEVICE = 3;

export function CompatibleDevices({ product }: CompatibleDevicesProps) {
   const devices = product.compatibility?.devices ?? [];

   const hasMoreToShow =
      devices.length > MAX_VISIBLE_DEVICES ||
      devices.some(
         (device) => device.variants.length > MAX_MODEL_LINES_PER_DEVICE
      );

   return (
      <>
         {devices.slice(0, MAX_VISIBLE_DEVICES).map((device, index) => (
            <a key={index} href="#compatibility">
               <CompatibleDevice
                  device={{ ...device, deviceUrl: undefined }}
                  maxModelLines={MAX_MODEL_LINES_PER_DEVICE}
                  mb="6px"
               />
            </a>
         ))}

         {hasMoreToShow ? (
            <Link
               href="#compatibility"
               mt={3}
               display="block"
               fontWeight="medium"
               color="brand.500"
            >
               See all compatible devices
            </Link>
         ) : null}
      </>
   );
}
