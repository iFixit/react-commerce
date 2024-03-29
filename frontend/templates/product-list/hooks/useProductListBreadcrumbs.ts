import { productListPath, storePath } from '@helpers/path-helpers';
import type { BreadcrumbItem } from '@ifixit/breadcrumbs';
import { ProductList, ProductListType } from '@models/product-list';
import { useDevicePartsItemType } from './useDevicePartsItemType';

export function useProductListBreadcrumbs(
   productList: ProductList
): BreadcrumbItem[] {
   const breadcrumbs: BreadcrumbItem[] = [
      {
         label: 'Store',
         url: storePath(),
      },
   ];

   productList.ancestors.forEach((ancestor) => {
      breadcrumbs.push({
         label: ancestor.title,
         url: productListPath({ productList: ancestor }),
      });
   });

   const itemType = useDevicePartsItemType({
      ...productList,
   });

   if (productList.type === ProductListType.DeviceParts && itemType) {
      breadcrumbs.push({
         label: productList.title,
         url: productListPath({ productList }),
      });
      breadcrumbs.push({
         label: itemType,
      });
   } else {
      breadcrumbs.push({
         label: productList.title,
      });
   }

   return breadcrumbs;
}
