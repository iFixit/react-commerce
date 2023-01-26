import { PRODUCT_LIST_DEFAULT_FACET_VALUES_COUNT } from '@config/constants';
import { ProductList, ProductListType } from '@models/product-list';
import { useCallback } from 'react';
import { MenuFacet } from '../MenuFacet';
import { useItemURLFactory } from '../useItemURLFactory';
import { useMenuFacet } from '../useMenuFacet';
import { FacetAccordionItem } from './FacetAccordionItem';
import { useFacetAccordionItemState } from './useFacetAccordionItemState';

type FacetMenuAccordionItemProps = {
   attribute: string;
   productList: ProductList;
   isExpanded: boolean;
   refinedCount: number;
   onFacetValueClick?: (value: string) => void;
};

export function FacetMenuAccordionItem({
   attribute,
   productList,
   isExpanded,
   refinedCount,
   onFacetValueClick,
}: FacetMenuAccordionItemProps) {
   const isDevicePartsItemType =
      attribute === 'facet_tags.Item Type' &&
      productList.type === ProductListType.DeviceParts;

   const isToolsCategory =
      attribute === 'facet_tags.Tool Category' &&
      productList.type === ProductListType.ToolsCategory;

   const {
      items,
      refine,
      canLoadMore,
      canToggleShowMore,
      isShowingMore,
      toggleShowMore,
      hasApplicableRefinements,
   } = useMenuFacet({ attribute, productList });

   const { isDisabled, isHidden } = useFacetAccordionItemState({
      attribute,
      hasApplicableRefinements,
      productList,
   });

   const { createItemTypeURL, createToolCategoryURL } = useItemURLFactory();
   const createItemURL = isDevicePartsItemType
      ? createItemTypeURL
      : isToolsCategory
      ? createToolCategoryURL
      : undefined;

   const handleItemClick = useCallback(
      (value: string) => {
         refine(value);
         onFacetValueClick?.(value);
      },
      [onFacetValueClick, refine]
   );

   return (
      <FacetAccordionItem
         attribute={attribute}
         isDisabled={isDisabled}
         isHidden={isHidden}
         isExpanded={isExpanded}
         refinedCount={refinedCount}
         refinementIndicator="dot"
      >
         <MenuFacet
            items={items}
            limit={PRODUCT_LIST_DEFAULT_FACET_VALUES_COUNT}
            canToggleShowMore={canLoadMore ? canToggleShowMore : undefined}
            isShowingMore={canLoadMore ? isShowingMore : undefined}
            onShowMore={canLoadMore ? toggleShowMore : undefined}
            createItemURL={createItemURL}
            onItemClick={handleItemClick}
            navigateOnClick={isToolsCategory}
         />
      </FacetAccordionItem>
   );
}
