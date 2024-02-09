import { ProductListType } from '@models/product-list';
import { useAlgoliaSearch } from 'app/_data/product-list/useAlgoliaSearch';
import * as React from 'react';

type ProductListAttributes = {
   type?: ProductListType | null;
};

export function useDevicePartsItemType<T extends ProductListAttributes>(
   productList: T
) {
   const { facets } = useAlgoliaSearch();
   const algoliaItemType = React.useMemo(() => {
      const itemTypeRefinement = facets.find(
         (refinementItem) => refinementItem.name === 'facet_tags.Item Type'
      );
      // `Item Type` is a single select, so just use the first value if it exists.
      return itemTypeRefinement?.options[0]?.value;
   }, [facets]);
   const itemType =
      productList.type === ProductListType.DeviceParts && algoliaItemType;
   return itemType ? String(itemType) : undefined;
}
