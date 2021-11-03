import { COLLECTION_PAGE_PARAM } from '@constants';
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
         {isFiltered ? (
            <meta name="robots" content="noindex,nofollow" />
         ) : (
            <>
               <link
                  rel="canonical"
                  href={`https://ifixit.com/collections/${collection.handle}${
                     searchParams.page > 1
                        ? `?${COLLECTION_PAGE_PARAM}=${searchParams.page}`
                        : ''
                  }`}
               />
               <meta
                  name="description"
                  content={collection.metaDescription || collection.description}
               />
            </>
         )}
         <title>
            iFixit | {collection.title}
            {!isFiltered && searchParams.page > 1
               ? ` - Page ${searchParams.page}`
               : ''}
         </title>
      </Head>
   );
}
