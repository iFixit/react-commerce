import {
   getProductListPath,
   getRefinementDisplayType,
} from '@helpers/product-list-helpers';
import { ProductList, ProductListType } from '@models/product-list';
import * as React from 'react';
import { RefinementList } from './RefinementList';
import { RefinementMenu } from './RefinementMenu';
import { useInstantSearch } from 'react-instantsearch-hooks-web';
import { uiStateToQueryString } from '@components/common/InstantSearchProvider';
import { RefinementDisplayType } from '@models/product-list/types';

type FacetFilterProps = {
   attribute: string;
   productList: ProductList;
};

export function FacetFilter({ attribute, productList }: FacetFilterProps) {
   const { indexUiState } = useInstantSearch();
   const queryString = React.useMemo(
      () => uiStateToQueryString(indexUiState, ['facet_tags.Item Type']),
      [indexUiState]
   );
   const createItemTypeURL = React.useCallback(
      (itemType: string) => {
         const path = getProductListPath({
            ...productList,
            type: ProductListType.DeviceItemTypeParts,
            itemType,
         });
         return `${path}${queryString}`;
      },
      [productList, queryString]
   );
   const refinementDisplayType = getRefinementDisplayType(
      attribute,
      productList.type
   );
   switch (refinementDisplayType) {
      case RefinementDisplayType.SingleSelect:
         return (
            <RefinementMenu
               attribute={attribute}
               showMore
               showMoreLimit={200}
               createURL={createItemTypeURL}
               activeValue={
                  productList.type === ProductListType.DeviceItemTypeParts
                     ? productList.itemType
                     : undefined
               }
            />
         );
      case RefinementDisplayType.MultiSelect:
         return (
            <RefinementList
               attribute={attribute}
               showMore
               showMoreLimit={200}
            />
         );
   }
}
