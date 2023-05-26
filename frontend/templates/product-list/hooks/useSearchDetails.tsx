import React from 'react';
import { useSearchBox } from 'react-instantsearch-hooks-web';

type SearchDetailsContext = {
   searchQuery: string;
   setSearchQuery: (_: string) => void;
};

export const SearchDetailsContext =
   React.createContext<SearchDetailsContext | null>(null);

export const SearchDetailsProvider = ({
   children,
}: React.PropsWithChildren) => {
   const { query: initialQuery } = useSearchBox();
   const [searchQuery, setSearchQuery] = React.useState(initialQuery);
   return (
      <SearchDetailsContext.Provider value={{ searchQuery, setSearchQuery }}>
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
