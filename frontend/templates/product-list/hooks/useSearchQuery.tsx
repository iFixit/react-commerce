import React from 'react';
import { useSearchBox } from 'react-instantsearch-hooks-web';

type SearchQueryContext = {
   searchQuery: string;
   setSearchQuery: (_: string) => void;
};

export const SearchQueryContext =
   React.createContext<SearchQueryContext | null>(null);

export const SearchQueryProvider = ({ children }: React.PropsWithChildren) => {
   const { query } = useSearchBox();
   const [searchQuery, setSearchQuery] = React.useState(query);
   return (
      <SearchQueryContext.Provider value={{ searchQuery, setSearchQuery }}>
         {children}
      </SearchQueryContext.Provider>
   );
};

export const useSearchQueryContext = () => {
   const context = React.useContext(SearchQueryContext);
   if (!context) {
      throw new Error(
         'useSearchQueryContext must be used within a SearchQueryContext'
      );
   }
   return context;
};
