import { PRODUCT_LIST_DEFAULT_FACET_VALUES_COUNT } from '@config/constants';
import { ProductList, ProductListType } from '@models/product-list';
import { useCallback } from 'react';
import { MenuFacet } from '../MenuFacet';
import { useCreateItemTypeURL } from '../useCreateItemTypeURL';
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
   const createItemURL = useCreateItemTypeURL();

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
            attribute={attribute}
            items={items}
            limit={PRODUCT_LIST_DEFAULT_FACET_VALUES_COUNT}
            canToggleShowMore={canLoadMore ? canToggleShowMore : undefined}
            isShowingMore={canLoadMore ? isShowingMore : undefined}
            onShowMore={canLoadMore ? toggleShowMore : undefined}
            createItemURL={isDevicePartsItemType ? createItemURL : undefined}
            onItemClick={handleItemClick}
         />
      </FacetAccordionItem>
   );
}
