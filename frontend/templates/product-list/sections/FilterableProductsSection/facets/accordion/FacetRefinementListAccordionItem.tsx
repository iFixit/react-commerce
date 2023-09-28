import { ProductList } from '@models/product-list';
import { RefinementListFacet } from '../RefinementListFacet';
import { useRefinementListFacet } from '../useRefinementListFacet';
import { FacetAccordionItem } from './FacetAccordionItem';
import { useFacetAccordionItemState } from './useFacetAccordionItemState';

type FacetMenuAccordionItemProps = {
   attribute: string;
   productList: ProductList;
   isExpanded: boolean;
   refinedCount: number;
};

export function FacetRefinementListAccordionItem({
   attribute,
   productList,
   isExpanded,
   refinedCount,
}: FacetMenuAccordionItemProps) {
   const {
      items,
      refine,
      canToggleShowMore,
      isShowingMore,
      toggleShowMore,
      hasApplicableRefinements,
   } = useRefinementListFacet({ attribute });
   const { isDisabled, isHidden } = useFacetAccordionItemState({
      attribute,
      hasApplicableRefinements,
      productList,
   });

   return (
      <FacetAccordionItem
         attribute={attribute}
         isDisabled={isDisabled}
         isHidden={isHidden}
         isExpanded={isExpanded}
         refinedCount={refinedCount}
         refinementIndicator="count"
      >
         <RefinementListFacet
            attribute={attribute}
            items={items}
            refine={refine}
            canToggleShowMore={canToggleShowMore}
            isShowingMore={isShowingMore}
            onToggleShowMore={toggleShowMore}
         />
      </FacetAccordionItem>
   );
}
