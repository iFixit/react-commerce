import { getProductListPath } from '@helpers/product-list-helpers';
import { ProductList, ProductListType } from '@models/product-list';
import * as React from 'react';
import { RefinementList } from './RefinementList';
import { RefinementMenu } from './RefinementMenu';

type FacetFilterProps = {
   attribute: string;
   productList: ProductList;
};

export function FacetFilter({ attribute, productList }: FacetFilterProps) {
   const createItemTypeURL = React.useCallback(
      (itemType: string) => {
         return getProductListPath({
            ...productList,
            type: ProductListType.DeviceItemTypeParts,
            itemType,
         });
      },
      [productList]
   );
   switch (attribute) {
      case 'facet_tags.Item Type': {
         switch (productList.type) {
            case ProductListType.DeviceParts:
            case ProductListType.DeviceItemTypeParts:
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
            default:
               return (
                  <RefinementList
                     attribute={attribute}
                     showMore
                     showMoreLimit={200}
                  />
               );
         }
      }
      default: {
         return (
            <RefinementList
               attribute={attribute}
               showMore
               showMoreLimit={200}
            />
         );
      }
   }
}
