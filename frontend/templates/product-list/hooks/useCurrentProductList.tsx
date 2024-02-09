import { SentryError } from '@ifixit/sentry';
import { ProductList } from '@models/product-list';
import React, { PropsWithChildren } from 'react';
import { useMenu } from 'react-instantsearch';
import { useItemTypeProductList } from './useItemTypeProductList';
import { useVariantProductList } from './useVariantProductList';

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
   useMenu({ attribute: 'worksin' });

   const variantUpdatedProductList = useVariantProductList(
      productList,
      algoliaUrl
   );
   const itemTypeUpdatedProductList = useItemTypeProductList(
      variantUpdatedProductList
   );
   const alteredProductList =
      itemTypeUpdatedProductList ?? variantUpdatedProductList;

   return (
      <CurrentProductListContext.Provider
         value={{ currentProductList: alteredProductList }}
      >
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
