import { ProductList } from '@models/product-list';
import { Facet } from 'app/_data/product-list/concerns/facets';
import { RefinementListFacet } from '../RefinementListFacet';
import { FacetAccordionItem } from './FacetAccordionItem';
import { useFacetAccordionItemState } from './useFacetAccordionItemState';

type FacetMenuAccordionItemProps = {
   productList: ProductList;
   facet: Facet;
   isExpanded: boolean;
};

export function FacetRefinementListAccordionItem({
   productList,
   facet,
   isExpanded,
}: FacetMenuAccordionItemProps) {
   const { isDisabled, isHidden } = useFacetAccordionItemState({
      attribute: facet.name,
      hasApplicableRefinements: facet.options.length > 0,
      productList,
   });

   return (
      <FacetAccordionItem
         attribute={facet.name}
         isDisabled={isDisabled}
         isHidden={isHidden}
         isExpanded={isExpanded}
         refinedCount={facet.selectedCount}
         refinementIndicator="count"
      >
         <RefinementListFacet
            attribute={facet.name}
            items={facet.options}
            refine={() => {}}
         />
      </FacetAccordionItem>
   );
}
