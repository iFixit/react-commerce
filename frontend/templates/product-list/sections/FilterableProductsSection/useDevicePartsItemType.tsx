import { ProductListType } from '@models/product-list';
import * as React from 'react';
import { useCurrentRefinements } from 'react-instantsearch-hooks-web';

type ProductListAttributes = {
   type?: ProductListType | null;
   deviceItemType?: string | null;
};

export function useDevicePartsItemType<T extends ProductListAttributes>(
   productList: T
) {
   const { items } = useCurrentRefinements();
   const itemType = React.useMemo(() => {
      const itemTypeRefinement = items.find(
         (refinementItem) => refinementItem.attribute === 'facet_tags.Item Type'
      );
      // `Item Type` is a single select, so just use the first value if it exists.
      return itemTypeRefinement?.refinements[0]?.value;
   }, [items]);
   if (!itemType || productList.type !== ProductListType.DeviceParts) {
      return undefined;
   }
   return String(itemType);
}
