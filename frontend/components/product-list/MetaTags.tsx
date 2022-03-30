import { PRODUCT_LIST_PAGE_PARAM } from '@config/constants';
import { IFIXIT_ORIGIN } from '@config/env';
import { useSearchParams } from '@lib/algolia';
import { ProductList } from '@models/product-list';
import Head from 'next/head';
import * as React from 'react';

export interface MetaTagsProps {
   productList: ProductList;
}

export function MetaTags({ productList }: MetaTagsProps) {
   const searchParams = useSearchParams();
   const isFiltered =
      searchParams.query.length > 0 || searchParams.filters.allIds.length > 0;
   let title = `iFixit | ${productList.title}`;
   if (!isFiltered && searchParams.page > 1) {
      title += ` - Page ${searchParams.page}`;
   }
   const canonicalUrl = `${IFIXIT_ORIGIN}${productList.path}${
      searchParams.page > 1
         ? `?${PRODUCT_LIST_PAGE_PARAM}=${searchParams.page}`
         : ''
   }`;
   const imageUrl = productList.image?.url;
   return (
      <Head>
         {isFiltered ? (
            <meta name="robots" content="noindex,nofollow" />
         ) : (
            <>
               <link rel="canonical" href={canonicalUrl} />
               <meta
                  name="description"
                  content={
                     productList.metaDescription || productList.description
                  }
               />
            </>
         )}
         <title>{title}</title>
         <meta property="og:title" content={title} />
         <meta
            name="og:description"
            content={productList.metaDescription || productList.description}
         />
         <meta property="og:type" content="website" />
         <meta property="og:url" content={canonicalUrl} />
         {imageUrl && <meta property="og:image" content={imageUrl} />}
      </Head>
   );
}
