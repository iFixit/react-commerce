import { FlexProps } from '@chakra-ui/react';
import { IFIXIT_ORIGIN } from '@config/env';
import { stylizeDeviceTitle } from '@helpers/product-list-helpers';
import type { ProductList } from '@models/product-list';
import { ProductListType } from '@models/product-list';
import { NavTabs } from '@components/common/NavTabs';

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
      <NavTabs
         {...flexProps}
         tabs={[
            {
               name: 'Parts',
               isCurrentPage: true,
            },
            {
               name: 'Guides',
               url: guideUrl,
            },
            {
               name: 'Answers',
               url: answersUrl,
            },
         ]}
      />
   );
}
