import React from 'react';
import { useSearchBox, useHits } from 'react-instantsearch-hooks-web';
import { ProductSearchHit } from '@models/product-list';

type SearchDetailsContext = ReturnType<typeof useHits<ProductSearchHit>> & {
   searchQuery: string;
   setSearchQuery: (_: string) => void;
};

export const SearchDetailsContext =
   React.createContext<SearchDetailsContext | null>(null);

export const SearchDetailsProvider = ({
   children,
}: React.PropsWithChildren) => {
   const { query: initialQuery } = useSearchBox();
   const hitsProps = useHits<ProductSearchHit>();
   const [searchQuery, setSearchQuery] = React.useState(initialQuery);
   return (
      <SearchDetailsContext.Provider
         value={{ searchQuery, setSearchQuery, ...hitsProps }}
      >
         {children}
      </SearchDetailsContext.Provider>
   );
};

export const useSearchDetails = () => {
   const context = React.useContext(SearchDetailsContext);
   if (!context) {
      throw new Error(
         'useSearchDetails must be used within a SearchDetailsContext'
      );
   }
   return context;
};
