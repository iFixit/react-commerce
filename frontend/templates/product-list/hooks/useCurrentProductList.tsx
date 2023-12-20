import { ProductList } from '@models/product-list';
import { useVariantProductList } from './useVariantProductList';
import { useItemTypeProductList } from './useItemTypeProductList';
import React, { PropsWithChildren } from 'react';
import { SentryError } from '@ifixit/sentry';

/**
 * Used to modify product list data before rendering
 * The Order that the hooks are called is important as to what the data will look like
 * This lets us do things like Item Type Overrides for product lists
 */

type CurrentProductListContext = {
   currentProductList: ProductList;
};

type CurrentProductListProviderProps = PropsWithChildren<{
   productList: ProductList;
   algoliaUrl?: string;
}>;

export const CurrentProductListContext =
   React.createContext<CurrentProductListContext | null>(null);

export const CurrentProductListProvider = ({
   productList,
   algoliaUrl,
   children,
}: CurrentProductListProviderProps) => {
   const variantUpdatedProductList = useVariantProductList(
      productList,
      algoliaUrl
   );
   const itemTypeUpdatedProductList = useItemTypeProductList(
      variantUpdatedProductList
   );
   const alteredProductList =
      itemTypeUpdatedProductList ?? variantUpdatedProductList;
   const [currentProductList, setCurrentProductList] =
      React.useState(alteredProductList);

   return (
      <CurrentProductListContext.Provider value={{ currentProductList }}>
         {children}
      </CurrentProductListContext.Provider>
   );
};

export const useCurrentProductList = () => {
   const context = React.useContext(CurrentProductListContext);
   if (!context) {
      throw new SentryError(
         'currentProductList must be used within a CurrentProductListContext'
      );
   }
   return context;
};
