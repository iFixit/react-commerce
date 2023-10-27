import {
   Crucial,
   Google,
   Hp,
   Lenovo,
   Logitech,
   Micron,
   Microsoft,
   Motorola,
   Nokia,
   Samsung,
   Steam,
   TeenageEngineering,
   Valve,
   Vive,
} from '@assets/svg/files/partners';
import { Flex, Link, Text, useTheme } from '@chakra-ui/react';
import type { Product } from '@pages/api/nextjs/cache/product';
import React from 'react';
import { faBadgeCheck } from '@fortawesome/pro-duotone-svg-icons';
import { FaIcon } from '@ifixit/icons';

export type GenuinePartBannerProps = {
   oemPartnership: NonNullable<Product['oemPartnership']>;
};

const partnerCodeToComponentMap: { [key: string]: React.FC } = {
   google_pixel: Google,
   crucial: () => <Crucial px="2" />,
   hp: () => <Hp py="2" />,
   htc_vive: Vive,
   lenovo: Lenovo,
   logitech: Logitech,
   micron: () => <Micron px="2" />,
   microsoft_surface: Microsoft,
   microsoft_surface_tool: Microsoft,
   motorola: Motorola,
   nokia: Nokia,
   samsung_galaxy: Samsung,
   steam_deck: Steam,
   teenage_engineering: TeenageEngineering,
   valve: Valve,
};

const netsuitePartnerToComponentMap: { [key: string]: React.FC } = {
   'Genuine Google Pixel Part': Google,
   'Genuine Crucial Drive': () => <Crucial px="2" />,
   'Genuine HP Part': () => <Hp py="2" />,
   'Genuine HTC Vive Part': Vive,
   'Genuine Lenovo Part': Lenovo,
   'Genuine Logitech Part': Logitech,
   'Genuine Micron Drive': () => <Micron px="2" />,
   'Genuine Microsoft Surface Part': Microsoft,
   'Genuine Microsoft Surface Tool': Microsoft,
   'Genuine Motorola Part': Motorola,
   'Genuine Nokia Part': Nokia,
   'Genuine Samsung Galaxy Part': Samsung,
   'Genuine Steam Deck Part': Steam,
   'Genuine Teenage Engineering Part': TeenageEngineering,
   'Genuine Valve Index Part': Valve,
};

export function GenuinePartBanner({ oemPartnership }: GenuinePartBannerProps) {
   const { code, text, url } = oemPartnership;
   // This text is designed to be used as a badge, here we
   // lowercase the first letter and Part/Tool so it fits in a sentence.
   const lowerCaseText = text.replace(/^(.)|Tool|Part/g, (str) =>
      str.toLowerCase()
   );
   const theme = useTheme();

   const PartnerLogo =
      partnerCodeToComponentMap[code] ?? netsuitePartnerToComponentMap[code];
   const hasPartnerLogo = PartnerLogo !== undefined;

   return (
      <Flex
         mt="4"
         minH="16"
         borderWidth="1px"
         borderStyle="solid"
         borderColor="brand.500"
         borderRadius="md"
         boxShadow={`0 0 10px ${theme.colors.brand[200]}`}
         overflow="hidden"
      >
         <Flex
            w="24"
            flex="none"
            borderRightWidth="1px"
            borderRightStyle="solid"
            borderRightColor={hasPartnerLogo ? 'gray.200' : 'brand.200'}
            bg={hasPartnerLogo ? 'gray.100' : 'brand.100'}
            alignItems="center"
            justifyContent="center"
         >
            {hasPartnerLogo ? (
               <PartnerLogo />
            ) : (
               <FaIcon icon={faBadgeCheck} color="brand.500" h="8" />
            )}
         </Flex>
         <Flex
            direction="column"
            fontSize="sm"
            px="3"
            py="2"
            fontWeight="medium"
            lineHeight="short"
            justify="center"
         >
            <Text lineHeight="shorter">This is a {lowerCaseText}.</Text>
            {url && (
               <Link href={url} color="brand.500" target="_blank">
                  Learn more.
               </Link>
            )}
         </Flex>
      </Flex>
   );
}
