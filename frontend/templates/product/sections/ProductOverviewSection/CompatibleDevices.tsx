import { Link, LinkBox, LinkOverlay } from '@chakra-ui/react';
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
         {devices.slice(0, MAX_VISIBLE_DEVICES).map((device, index) => (
            <LinkBox key={index}>
               <LinkOverlay href="#compatibility" />
               <CompatibleDevice
                  device={{ ...device, deviceUrl: '#compatibility' }}
                  maxModelLines={MAX_MODEL_LINES_PER_DEVICE}
                  role="group"
                  mb="6px"
               />
            </LinkBox>
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
