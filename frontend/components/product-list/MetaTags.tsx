import { PRODUCT_LIST_PAGE_PARAM } from '@config/constants';
import { useAppContext } from '@ifixit/app';
import { ProductList } from '@models/product-list';
import Head from 'next/head';
import * as React from 'react';
import {
   useCurrentRefinements,
   usePagination,
} from 'react-instantsearch-hooks-web';

export interface MetaTagsProps {
   productList: ProductList;
}

export function MetaTags({ productList }: MetaTagsProps) {
   const appContext = useAppContext();
   const currentRefinements = useCurrentRefinements();
   const pagination = usePagination();
   const page = pagination.currentRefinement;
   const isFiltered = currentRefinements.items.length > 0;
   let title = productList.title;
   if (!isFiltered && page > 1) {
      title += ` - Page ${page}`;
   }
   title += ' | iFixit';
   const canonicalUrl = `${appContext.ifixitOrigin}${productList.path}${
      page > 1 ? `?${PRODUCT_LIST_PAGE_PARAM}=${page}` : ''
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
