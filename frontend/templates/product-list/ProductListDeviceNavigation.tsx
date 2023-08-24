import { Flex, FlexProps } from '@chakra-ui/react';
import { SecondaryNavbarItem, SecondaryNavbarLink } from '@components/common';
import { IFIXIT_ORIGIN } from '@config/env';
import { stylizeDeviceTitle } from '@helpers/product-list-helpers';
import type { ProductList } from '@models/product-list';
import { ProductListType } from '@models/product-list';

type ProductListDeviceNavigationProps = FlexProps & {
   productList: ProductList;
};

export function ProductListDeviceNavigation({
   productList,
   ...flexProps
}: ProductListDeviceNavigationProps) {
   let guideUrl: string | undefined;
   let answersUrl: string | undefined;
   if (
      productList.type === ProductListType.DeviceParts &&
      productList.deviceTitle
   ) {
      const deviceHandle = encodeURIComponent(
         stylizeDeviceTitle(productList.deviceTitle)
      );
      guideUrl = `${IFIXIT_ORIGIN}/Device/${deviceHandle}`;
      answersUrl = `${IFIXIT_ORIGIN}/Answers/Device/${deviceHandle}`;
   }

   if (guideUrl == null || answersUrl == null) {
      return null;
   }

   return (
      <Flex
         h="full"
         align="stretch"
         borderLeftWidth={{
            base: '0',
            sm: '1px',
            md: '0',
         }}
         bg="white"
         {...flexProps}
      >
         <SecondaryNavbarItem isCurrent>Parts</SecondaryNavbarItem>
         <SecondaryNavbarItem>
            <SecondaryNavbarLink href={guideUrl}>Guides</SecondaryNavbarLink>
         </SecondaryNavbarItem>
         <SecondaryNavbarItem>
            <SecondaryNavbarLink href={answersUrl}>Answers</SecondaryNavbarLink>
         </SecondaryNavbarItem>
      </Flex>
   );
}
