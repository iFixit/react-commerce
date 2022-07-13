import { indexUiStateToRoute } from '@components/common/InstantSearchProvider';
import { ProductListType } from '@models/product-list';
import * as React from 'react';
import { useInstantSearch } from 'react-instantsearch-hooks-web';

type ProductListAttributes = {
   type?: ProductListType | null;
};

export function useDevicePartsItemType<T extends ProductListAttributes>(
   productList: T
) {
   const { indexUiState } = useInstantSearch();
   const routeState = React.useMemo(
      () => indexUiStateToRoute(indexUiState),
      [indexUiState]
   );
   const raw: string | string[] | undefined =
      routeState.filter?.['facet_tags.Item Type'];
   const itemType = Array.isArray(raw) ? raw[0] : raw;
   if (!itemType?.length || productList.type !== ProductListType.DeviceParts) {
      return undefined;
   }
   return itemType;
}
