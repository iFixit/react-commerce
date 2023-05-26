import { ProductList, ProductListType } from '@models/product-list';
import { useSearchDetails } from '@templates/product-list/hooks/useSearchDetails';

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
   const { hits } = useSearchDetails();
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
