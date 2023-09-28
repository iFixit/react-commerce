import {
   PRODUCT_LIST_DEFAULT_FACET_VALUES_COUNT,
   PRODUCT_LIST_MAX_FACET_VALUES_COUNT,
} from '@config/constants';
import { ProductList, ProductListType } from '@models/product-list';
import { useHits, useMenu, UseMenuProps } from 'react-instantsearch';
import { useSortBy } from './useSortBy';

export type MenuFacetState = ReturnType<typeof useMenuFacet>;

export type UseMenuFacetProps = {
   attribute: string;
   productList: ProductList;
};

export function useMenuFacet({ attribute, productList }: UseMenuFacetProps) {
   const isDevicePartsItemType =
      attribute === 'facet_tags.Item Type' &&
      productList.type === ProductListType.DeviceParts;

   const limit = isDevicePartsItemType
      ? PRODUCT_LIST_MAX_FACET_VALUES_COUNT
      : PRODUCT_LIST_DEFAULT_FACET_VALUES_COUNT;

   const filteredMenu = useFilteredMenu({
      attribute,
      limit,
      showMore: limit < PRODUCT_LIST_MAX_FACET_VALUES_COUNT,
   });

   const canLoadMore = limit < PRODUCT_LIST_MAX_FACET_VALUES_COUNT;
   const hasApplicableRefinements = filteredMenu.items.length > 0;
   return {
      ...filteredMenu,
      canLoadMore,
      hasApplicableRefinements,
   };
}

function useFilteredMenu(props: UseMenuProps) {
   const { items, ...rest } = useMenu({
      sortBy: useSortBy(props),
      showMoreLimit: PRODUCT_LIST_MAX_FACET_VALUES_COUNT,
      showMore: true,
      ...props,
   });
   const { results } = useHits();
   const hitsCount = results?.nbHits ?? 0;
   const isAnyRefined = items.some((item) => item.isRefined);
   const filteredItems = isAnyRefined
      ? items
      : items.filter((item) => hitsCount !== item.count);

   return { ...rest, items: filteredItems };
}
