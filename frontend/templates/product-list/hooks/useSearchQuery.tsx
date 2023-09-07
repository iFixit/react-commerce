import React from 'react';
import { useSearchBox } from 'react-instantsearch';

type SearchQueryContext = {
   searchQuery: string;
   setSearchQuery: (_: string) => void;
};

export const SearchQueryContext =
   React.createContext<SearchQueryContext | null>(null);

export const SearchQueryProvider = ({ children }: React.PropsWithChildren) => {
   const { query: initialQuery } = useSearchBox();
   const [searchQuery, setSearchQuery] = React.useState(initialQuery);
   return (
      <SearchQueryContext.Provider value={{ searchQuery, setSearchQuery }}>
         {children}
      </SearchQueryContext.Provider>
   );
};

export const useSearchQuery = () => {
   const context = React.useContext(SearchQueryContext);
   if (!context) {
      throw new Error(
         'useSearchQueryContext must be used within a SearchQueryContext'
      );
   }
   return context;
};
