import { Box, Flex, IconButton, StackProps, VStack } from '@chakra-ui/react';
import { Tooltip } from '@components/ui/Tooltip';
import { faCircleInfo } from '@fortawesome/pro-solid-svg-icons';
import { FaIcon } from '@ifixit/icons';

type ShippingRestrictionsInfo = {
   [key: string]: { notice: string; text: string; link?: string };
};

const shippingRestrictionsInfo: ShippingRestrictionsInfo = {
   is_battery: {
      notice: 'Shipping restrictions apply',
      text: 'Batteries may only be shipped within the contiguous USA at this time and may only ship via standard shipping.',
      link: 'https://help.ifixit.com/article/195-battery-shipping-warnings',
   },
   is_dangerous: {
      notice: 'Shipping restrictions apply',
      text: 'New safety regulations for dangerous goods may cause shipping delays.',
      link: 'https://help.ifixit.com/article/264-what-are-the-shipping-restrictions-for-orders-containing-dangerous-goods',
   },
   us_only: {
      notice: 'US shipping only',
      text: 'Due to shipping regulations, iFixit may only ship this product within the United States of America.',
   },
   does_not_ship_to_mexico: {
      notice: 'Mexico shipping unavailable',
      text: 'Due to shipping regulations, iFixit may not ship this product to Mexico.',
   },
   fulfilled_via_dropshipping: {
      notice: 'Partner fulfilled',
      text: 'This product will be packed and shipped by one of our fulfillment partners.',
   },
   is_oem_partner_restricted: {
      notice: 'Shipping restrictions apply',
      text: 'This product ships to the United States, Japan, South Korea, Hong Kong, and Taiwan only.',
   },
};

type ShippingRestrictionsProps = StackProps & {
   shippingRestrictions: string[];
};

export function ShippingRestrictions({
   shippingRestrictions,
   ...stackProps
}: ShippingRestrictionsProps) {
   const restrictionKeysToShow: string[] = [];
   const primaryRestrictionKey = shippingRestrictions.find(
      (sr) =>
         sr !== 'fulfilled_via_dropshipping' &&
         Object.keys(shippingRestrictionsInfo).includes(sr)
   );
   if (primaryRestrictionKey) {
      restrictionKeysToShow.push(primaryRestrictionKey);
   }
   if (shippingRestrictions.includes('fulfilled_via_dropshipping')) {
      restrictionKeysToShow.push('fulfilled_via_dropshipping');
   }

   if (restrictionKeysToShow.length > 0) {
      return (
         <VStack spacing="1" {...stackProps}>
            {restrictionKeysToShow.map((restrictionKey) => {
               const shippingRestriction =
                  shippingRestrictionsInfo[restrictionKey];
               return (
                  <Flex
                     key={restrictionKey}
                     py="0"
                     fontSize="sm"
                     align="center"
                  >
                     {shippingRestriction.notice}
                     <Tooltip
                        trigger={
                           <IconButton
                              aria-label="Learn more about this shipping restriction"
                              ml="1"
                              size="sm"
                              variant="ghost"
                              icon={
                                 <FaIcon
                                    icon={faCircleInfo}
                                    h="4"
                                    color="gray.400"
                                 />
                              }
                           />
                        }
                        content={
                           <>
                              <Box>{shippingRestriction.text}</Box>
                              {shippingRestriction.link && (
                                 <a
                                    href={shippingRestriction.link}
                                    target="_blank"
                                 >
                                    Learn more
                                 </a>
                              )}
                           </>
                        }
                     />
                  </Flex>
               );
            })}
         </VStack>
      );
   }

   return null;
}
