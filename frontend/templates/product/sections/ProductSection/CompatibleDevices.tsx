import { Product } from '@models/product';
import NextLink from 'next/link';
import { CompatibleDevice } from '@components/common';
import { chakra, Link } from '@chakra-ui/react';

export type CompatibleDevicesProps = {
   product: Product;
};

export function CompatibleDevices({ product }: CompatibleDevicesProps) {
   const compatibilityDrawerModelsTruncate = 4;
   const compatibilityDrawerDeviceTruncate = 3;
   const compatibilityDrawerIncomplete =
      product.compatibility &&
      (product.compatibility.devices.length >
         compatibilityDrawerDeviceTruncate ||
         product.compatibility.devices.some(
            (currentValue) =>
               currentValue.variants.length > compatibilityDrawerModelsTruncate
         ));

   return (
      <>
         {product.compatibility?.devices.slice(0, 3).map((device, index) => (
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
                     truncate={compatibilityDrawerModelsTruncate}
                  />
               </chakra.a>
            </NextLink>
         ))}

         {compatibilityDrawerIncomplete ? (
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
