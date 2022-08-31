import { getRefinementDisplayType } from '@helpers/product-list-helpers';
import { ProductList } from '@models/product-list';
import * as React from 'react';
import { RefinementMultiSelect } from './RefinementMultiSelect';
import { RefinementSingleSelect } from './RefinementSingleSelect';
import { RefinementDisplayType } from '@models/product-list/types';

type FacetFilterProps = {
   attribute: string;
   productList: ProductList;
   onClose?: () => void;
};

export function FacetFilter({
   attribute,
   productList,
   onClose,
}: FacetFilterProps) {
   switch (getRefinementDisplayType(attribute)) {
      case RefinementDisplayType.SingleSelect:
         return (
            <RefinementSingleSelect
               attribute={attribute}
               showMore
               showMoreLimit={200}
               productList={productList}
               onClose={onClose}
            />
         );
      case RefinementDisplayType.MultiSelect:
         return (
            <RefinementMultiSelect
               attribute={attribute}
               showMore
               showMoreLimit={200}
            />
         );
      default:
         throw new Error('Unknown refinement display type');
   }
}
