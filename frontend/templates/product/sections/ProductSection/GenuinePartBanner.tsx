import {
   Google,
   Lenovo,
   Logitech,
   Microsoft,
   Motorola,
   Samsung,
   Steam,
   TeenageEngineering,
   Valve,
   Vive,
} from '@assets/svg/partners';
import { Flex, Link, Text, useTheme } from '@chakra-ui/react';
import { Product } from '@models/product';
import React from 'react';

export type GenuinePartBannerProps = {
   oemPartnership: NonNullable<Product['oemPartnership']>;
};

const partnerCodeToComponentMap: { [key: string]: React.FC } = {
   // Don't have permission yet
   // google_pixel: Google,
   htc_vive: Vive,
   lenovo: Lenovo,
   logitech: Logitech,
   microsoft_surface: Microsoft,
   microsoft_surface_tool: Microsoft,
   motorola: Motorola,
   samsung_galaxy: Samsung,
   steam_deck: Steam,
   teenage_engineering: TeenageEngineering,
   valve: Valve,
};

export function GenuinePartBanner({ oemPartnership }: GenuinePartBannerProps) {
   const { code, text, url } = oemPartnership;
   const theme = useTheme();

   const PartnerLogo = partnerCodeToComponentMap[code];

   if (!PartnerLogo) {
      return null;
   }

   return (
      <Flex
         mt="4"
         minH="16"
         align="center"
         borderWidth="1px"
         borderStyle="solid"
         borderColor="brand.500"
         borderRadius="md"
         boxShadow={`0 0 10px ${theme.colors.brand[200]}`}
         overflow="hidden"
      >
         <Flex
            w="24"
            h="full"
            borderRightWidth="1px"
            borderRightStyle="solid"
            borderRightColor="gray.200"
            bg="gray.100"
            alignItems="center"
         >
            <PartnerLogo />
         </Flex>
         <Flex
            direction="column"
            fontSize="sm"
            px="3"
            py="2"
            fontWeight="medium"
            lineHeight="short"
         >
            <Text lineHeight="shorter">{`This is a ${text}`}</Text>
            {url && (
               <Link href={url} color="brand.500" target="_blank">
                  Learn more
               </Link>
            )}
         </Flex>
      </Flex>
   );
}
