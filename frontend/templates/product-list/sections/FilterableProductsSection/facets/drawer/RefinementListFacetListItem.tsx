import { isPartsProductList } from '@helpers/product-list-helpers';
import { ProductList } from '@models/product-list';
import { useRefinementListFacet } from '../useRefinementListFacet';
import { ListItem } from './ListItem';

type RefinementListFacetListItemProps = {
   attribute: string;
   refinedCount: number;
   productList: ProductList;
   onSelect: (attribute: string) => void;
};

export function RefinementListFacetListItem({
   attribute,
   refinedCount,
   productList,
   onSelect,
}: RefinementListFacetListItemProps) {
   const { hasApplicableRefinements } = useRefinementListFacet({ attribute });

   if (!hasApplicableRefinements) {
      return null;
   }
   const isToolCategoryOnParts =
      isPartsProductList(productList) &&
      attribute === 'facet_tags.Tool Category';

   if (isToolCategoryOnParts) {
      return null;
   }
   return (
      <ListItem
         attribute={attribute}
         onSelect={onSelect}
         refinedCount={refinedCount}
         refinementIndicator="count"
      />
   );
}
