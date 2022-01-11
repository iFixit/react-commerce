import { COLLECTION_PAGE_PARAM } from '@config/constants';
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
   let title = `iFixit | ${collection.title}`;
   if (!isFiltered && searchParams.page > 1) {
      title += ` - Page ${searchParams.page}`;
   }
   const canonicalUrl = `https://www.ifixit.com/collections/${
      collection.handle
   }${
      searchParams.page > 1
         ? `?${COLLECTION_PAGE_PARAM}=${searchParams.page}`
         : ''
   }`;
   const imageUrl = collection.image?.url;
   return (
      <Head>
         {isFiltered ? (
            <meta name="robots" content="noindex,nofollow" />
         ) : (
            <>
               <link rel="canonical" href={canonicalUrl} />
               <meta
                  name="description"
                  content={collection.metaDescription || collection.description}
               />
            </>
         )}
         <title>{title}</title>
         <meta property="og:title" content={title} />
         <meta
            name="og:description"
            content={collection.metaDescription || collection.description}
         />
         <meta property="og:type" content="website" />
         <meta property="og:url" content={canonicalUrl} />
         {imageUrl && <meta property="og:image" content={imageUrl} />}
      </Head>
   );
}
