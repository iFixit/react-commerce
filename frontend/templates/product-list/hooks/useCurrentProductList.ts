import { ProductList } from '@models/product-list';
import { useVariantProductList } from './useVariantProductList';
import { useItemTypeProductList } from './useItemTypeProductList';

/**
 * Used to modify product list data before rendering
 * The Order that the hooks are called is important as to what the data will look like
 * This lets us do things like Item Type Overrides for product lists
 */
export function useCurrentProductList(
   productList: ProductList,
   algoliaUrl?: string
): ProductList {
   let variantUpdatedProductList = useVariantProductList(
      productList,
      algoliaUrl
   );
   const itemTypeUpdatedProductList = useItemTypeProductList(
      variantUpdatedProductList
   );
   return itemTypeUpdatedProductList ?? variantUpdatedProductList;
}
