import { getProductListTitle } from '@helpers/product-list-helpers';
import {
   ProductList,
   ProductListAncestor,
   ProductListType,
} from '@models/product-list';
import React from 'react';
import { useDevicePartsItemType } from './useDevicePartsItemType';

export function useProductListAncestors(productList: ProductList) {
   let { ancestors } = productList;
   const itemType = useDevicePartsItemType({
      ...productList,
   });

   let currentItemTitle = productList.title;
   if (productList.type === ProductListType.DeviceParts && itemType) {
      ancestors = appendDeviceAncestor(ancestors, productList);
      currentItemTitle = itemType;
   }

   const reverseAncestorList = React.useMemo(() => {
      return [...ancestors].reverse();
   }, [ancestors]);

   return { currentItemTitle, ancestors, reverseAncestorList };
}

function appendDeviceAncestor(
   ancestors: ProductListAncestor[],
   productList: ProductList
) {
   return ancestors.concat({
      deviceTitle: productList.deviceTitle ?? null,
      title: getProductListTitle({
         title: productList.title,
         type: productList.type,
      }),
      type: productList.type,
      handle: productList.handle,
   });
}
