import { useSearchParams } from '@lib/algolia';
import { CollectionData } from '@lib/api';
import Head from 'next/head';
import * as React from 'react';

export interface MetaTagsProps {
   collection: CollectionData;
}

export function MetaTags({ collection }: MetaTagsProps) {
   const searchParams = useSearchParams();
   const isFiltered =
      searchParams.query.length > 0 || searchParams.filters.allIds.length > 0;
   return (
      <Head>
         {isFiltered && <meta name="robots" content="noindex,nofollow" />}
         <title>
            iFixit | {collection.title}
            {!isFiltered && searchParams.page > 1
               ? ` - Page ${searchParams.page}`
               : ''}
         </title>
      </Head>
   );
}
