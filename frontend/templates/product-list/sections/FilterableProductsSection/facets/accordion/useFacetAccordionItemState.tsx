import { ProductList, ProductListType } from '@models/product-list';
import { useHits } from 'react-instantsearch';

export type UseFacetAccordionItemProps = {
   attribute: string;
   hasApplicableRefinements: boolean;
   productList: ProductList;
};

export function useFacetAccordionItemState({
   attribute,
   hasApplicableRefinements,
   productList,
}: UseFacetAccordionItemProps) {
   const { hits } = useHits();
   const isProductListEmpty = hits.length === 0;
   const isDisabled = isProductListEmpty || !hasApplicableRefinements;

   const isProductListEmptyState =
      isProductListEmpty && !hasApplicableRefinements;

   const isPartsPage =
      productList.type === ProductListType.AllParts ||
      productList.type === ProductListType.DeviceParts;

   const isWorksin = attribute === 'worksin' && isProductListEmptyState;
   const isToolCategoryOnPartsPage =
      isPartsPage && attribute === 'facet_tags.Tool Category';

   const isHidden =
      (!hasApplicableRefinements && !isProductListEmpty) ||
      isWorksin ||
      isToolCategoryOnPartsPage;

   return { isDisabled, isHidden };
}
