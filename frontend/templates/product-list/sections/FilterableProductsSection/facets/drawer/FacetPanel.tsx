import { getFacetWidgetType } from '@helpers/product-list-helpers';
import { assertNever } from '@ifixit/helpers';
import { FacetWidgetType, ProductList } from '@models/product-list';
import { MenuFacetPanel } from './MenuFacetPanel';
import { RefinementListFacetPanel } from './RefinementListFacetPanel';

type FacetPanelProps = {
   attribute: string;
   productList: ProductList;
   isOpen: boolean;
   onClose: () => void;
};

export function FacetPanel({
   attribute,
   productList,
   isOpen,
   onClose,
}: FacetPanelProps) {
   const widgetType = getFacetWidgetType(attribute);

   switch (widgetType) {
      case FacetWidgetType.Menu: {
         return (
            <MenuFacetPanel
               attribute={attribute}
               productList={productList}
               isOpen={isOpen}
               onClose={onClose}
            />
         );
      }
      case FacetWidgetType.RefinementList: {
         return (
            <RefinementListFacetPanel attribute={attribute} isOpen={isOpen} />
         );
      }
      default:
         return assertNever(widgetType);
   }
}
