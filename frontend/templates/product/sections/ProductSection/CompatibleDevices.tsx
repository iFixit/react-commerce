import { chakra, Link } from '@chakra-ui/react';
import { CompatibleDevice } from '@components/common';
import type { Product } from '@pages/api/nextjs/cache/product';
import NextLink from 'next/link';

export type CompatibleDevicesProps = {
   product: Product;
};

const MAX_VISIBLE_DEVICES = 3;
const MAX_MODEL_LINES_PER_DEVICE = 4;

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
            <NextLink key={index} href={device.deviceUrl} passHref>
               <chakra.a
                  role="group"
                  display="flex"
                  alignItems="flex-start"
                  transition="all 300m"
                  mb="6px"
               >
                  <CompatibleDevice
                     device={device}
                     maxModelLines={MAX_MODEL_LINES_PER_DEVICE}
                  />
               </chakra.a>
            </NextLink>
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
