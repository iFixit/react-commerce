import { ProductListType } from '@models/product-list';
import * as React from 'react';
import { useCurrentRefinements } from 'react-instantsearch';

type ProductListAttributes = {
   type?: ProductListType | null;
};

export function useDevicePartsItemType<T extends ProductListAttributes>(
   productList: T
) {
   const { items } = useCurrentRefinements();
   const algoliaItemType = React.useMemo(() => {
      const itemTypeRefinement = items.find(
         (refinementItem) => refinementItem.attribute === 'facet_tags.Item Type'
      );
      // `Item Type` is a single select, so just use the first value if it exists.
      return itemTypeRefinement?.refinements[0]?.value;
   }, [items]);
   const itemType =
      productList.type === ProductListType.DeviceParts && algoliaItemType;
   return itemType ? String(itemType) : undefined;
}
