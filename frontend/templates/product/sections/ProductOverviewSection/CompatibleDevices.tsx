import { Link } from '@chakra-ui/react';
import { CompatibleDevice } from '@components/common';
import type { Product } from '@pages/api/nextjs/cache/product';
import NextLink from 'next/link';

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
         {devices.slice(0, 3).map((device, index) => (
            <CompatibleDevice
               key={index}
               device={device}
               maxModelLines={MAX_MODEL_LINES_PER_DEVICE}
               role="group"
               mb="6px"
            />
         ))}

         {hasMoreToShow ? (
            <NextLink href="#compatibility" passHref>
               <Link
                  mt={3}
                  display="block"
                  fontWeight="medium"
                  color="brand.500"
               >
                  See all compatible devices
               </Link>
            </NextLink>
         ) : null}
      </>
   );
}
