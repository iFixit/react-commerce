import {
   PRODUCT_LIST_DEFAULT_FACET_VALUES_COUNT,
   PRODUCT_LIST_MAX_FACET_VALUES_COUNT,
} from '@config/constants';
import { ProductList, ProductListType } from '@models/product-list';
import { useCallback } from 'react';
import { MenuFacet } from '../MenuFacet';
import { useItemURLFactory } from '../useItemURLFactory';
import { useMenuFacet } from '../useMenuFacet';
import { Panel } from './Panel';

export type MenuFacetPanelProps = {
   attribute: string;
   productList: ProductList;
   isOpen: boolean;
   onClose: () => void;
};

export function MenuFacetPanel({
   attribute,
   productList,
   isOpen,
   onClose,
}: MenuFacetPanelProps) {
   const isDevicePartsItemType =
      attribute === 'facet_tags.Item Type' &&
      productList.type === ProductListType.DeviceParts;

   const isToolsCategory =
      attribute === 'facet_tags.Tool Category' &&
      productList.type === ProductListType.ToolsCategory;

   const limit = isDevicePartsItemType
      ? PRODUCT_LIST_MAX_FACET_VALUES_COUNT
      : PRODUCT_LIST_DEFAULT_FACET_VALUES_COUNT;
   const canLoadMore = limit < PRODUCT_LIST_MAX_FACET_VALUES_COUNT;

   const menuFacet = useMenuFacet({ attribute, productList });

   const { createItemTypeURL, createToolCategoryURL } = useItemURLFactory();
   const createItemURL = isDevicePartsItemType
      ? createItemTypeURL
      : isToolsCategory
      ? createToolCategoryURL
      : undefined;

   const handleItemClick = useCallback(
      (value: string) => {
         menuFacet.refine(value);
         onClose?.();
      },
      [menuFacet, onClose]
   );
   return (
      <Panel
         isOpen={isOpen}
         data-testid={`facet-panel${isOpen ? '-open' : ''}`}
      >
         <MenuFacet
            items={menuFacet.items}
            limit={PRODUCT_LIST_DEFAULT_FACET_VALUES_COUNT}
            canToggleShowMore={
               canLoadMore ? menuFacet.canToggleShowMore : undefined
            }
            isShowingMore={canLoadMore ? menuFacet.isShowingMore : undefined}
            onShowMore={canLoadMore ? menuFacet.toggleShowMore : undefined}
            createItemURL={createItemURL}
            onItemClick={handleItemClick}
            navigateOnClick={isToolsCategory}
         />
      </Panel>
   );
}
