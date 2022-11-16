import { ProductList, ProductListType } from '@models/product-list';
import { useMenuFacet } from '../useMenuFacet';
import { ListItem } from './ListItem';

type MenuFacetListItemProps = {
   attribute: string;
   refinedCount: number;
   productList: ProductList;
   onSelect: (attribute: string) => void;
};

export function MenuFacetListItem({
   attribute,
   refinedCount,
   productList,
   onSelect,
}: MenuFacetListItemProps) {
   const { hasApplicableRefinements } = useMenuFacet({
      attribute,
      productList,
   });

   if (!hasApplicableRefinements) {
      return null;
   }
   const isToolCategoryOnParts =
      (productList.type === ProductListType.AllParts ||
         productList.type === ProductListType.DeviceParts) &&
      attribute === 'facet_tags.Tool Category';

   if (isToolCategoryOnParts) {
      return null;
   }
   return (
      <ListItem
         attribute={attribute}
         onSelect={onSelect}
         refinedCount={refinedCount}
         refinementIndicator="dot"
      />
   );
}
