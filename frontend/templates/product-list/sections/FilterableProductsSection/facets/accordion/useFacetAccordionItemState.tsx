import { ProductList, ProductListType } from '@models/product-list';
import { usePagination } from 'react-instantsearch-hooks-web';

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
   const { nbHits } = usePagination();
   const isProductListEmpty = nbHits < 1;
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
