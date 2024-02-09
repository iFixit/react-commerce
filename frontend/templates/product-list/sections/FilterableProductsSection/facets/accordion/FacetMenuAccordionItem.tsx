import { PRODUCT_LIST_DEFAULT_FACET_VALUES_COUNT } from '@config/constants';
import { ProductList } from '@models/product-list';
import { Facet } from 'app/_data/product-list/concerns/facets';
import { MenuFacet } from '../MenuFacet';
import { FacetAccordionItem } from './FacetAccordionItem';
import { useFacetAccordionItemState } from './useFacetAccordionItemState';

type FacetMenuAccordionItemProps = {
   productList: ProductList;
   facet: Facet;
   isExpanded: boolean;
};

export function FacetMenuAccordionItem({
   productList,
   facet,
   isExpanded,
}: FacetMenuAccordionItemProps) {
   // const isDevicePartsItemType =
   //    facet.name === 'facet_tags.Item Type' &&
   //    productList.type === ProductListType.DeviceParts;

   const { isDisabled, isHidden } = useFacetAccordionItemState({
      attribute: facet.name,
      hasApplicableRefinements: facet.options.length > 0,
      productList,
   });
   // const createItemURL = useCreateItemTypeURL();

   // const handleItemClick = useCallback(
   //    (value: string) => {
   //       refine(value);
   //       onFacetValueClick?.(value);
   //    },
   //    [onFacetValueClick, refine]
   // );

   return (
      <FacetAccordionItem
         attribute={facet.name}
         isDisabled={isDisabled}
         isHidden={isHidden}
         isExpanded={isExpanded}
         refinedCount={facet.selectedCount}
         refinementIndicator="dot"
      >
         <MenuFacet
            attribute={facet.name}
            items={facet.options}
            limit={PRODUCT_LIST_DEFAULT_FACET_VALUES_COUNT}
            // canToggleShowMore={canLoadMore ? canToggleShowMore : undefined}
            // isShowingMore={canLoadMore ? isShowingMore : undefined}
            // onShowMore={canLoadMore ? toggleShowMore : undefined}
            // createItemURL={isDevicePartsItemType ? createItemURL : undefined}
            // onItemClick={handleItemClick}
         />
      </FacetAccordionItem>
   );
}
