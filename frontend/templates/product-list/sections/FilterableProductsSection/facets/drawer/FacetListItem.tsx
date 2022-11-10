import { getFacetWidgetType } from '@helpers/product-list-helpers';
import { assertNever } from '@ifixit/helpers';
import { FacetWidgetType, ProductList } from '@models/product-list';
import { MenuFacetListItem } from './MenuFacetListItem';
import { RefinementListFacetListItem } from './RefinementListFacetListItem';

type FacetListItemProps = {
   attribute: string;
   refinedCount: number;
   onSelect: (attribute: string) => void;
   productList: ProductList;
};

export function FacetListItem({
   attribute,
   refinedCount,
   onSelect,
   productList,
}: FacetListItemProps) {
   const widgetType = getFacetWidgetType(attribute);

   switch (widgetType) {
      case FacetWidgetType.Menu: {
         return (
            <MenuFacetListItem
               attribute={attribute}
               productList={productList}
               refinedCount={refinedCount}
               onSelect={onSelect}
            />
         );
      }
      case FacetWidgetType.RefinementList: {
         return (
            <RefinementListFacetListItem
               attribute={attribute}
               productList={productList}
               refinedCount={refinedCount}
               onSelect={onSelect}
            />
         );
      }
      default:
         return assertNever(widgetType);
   }
}
