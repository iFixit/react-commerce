'use client';

import { SentryError } from '@ifixit/sentry';
import React from 'react';
import { AlgoliaSearchResult } from '.';

const AlgoliaSearchContext = React.createContext<AlgoliaSearchResult | null>(
   null
);

export function AlgoliaSearchProvider({
   hits,
   hitsCount,
   facets,
   page,
   query,
   children,
}: React.PropsWithChildren<AlgoliaSearchResult>) {
   const value = React.useMemo(
      (): AlgoliaSearchResult => ({
         hits,
         hitsCount,
         facets,
         page,
         query,
      }),
      [hits, hitsCount, facets, page, query]
   );

   return (
      <AlgoliaSearchContext.Provider value={value}>
         {children}
      </AlgoliaSearchContext.Provider>
   );
}

export function useAlgoliaSearch() {
   const context = React.useContext(AlgoliaSearchContext);
   if (context == null) {
      throw new SentryError(
         'useAlgoliaSearch must be used within an AlgoliaSearchProvider'
      );
   }
   return context;
}
