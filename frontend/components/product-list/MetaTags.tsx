import { PRODUCT_LIST_PAGE_PARAM } from '@config/constants';
import { getProductListTitle } from '@helpers/product-list-helpers';
import { useAppContext } from '@ifixit/app';
import { ProductList } from '@models/product-list';
import Head from 'next/head';
import {
   useCurrentRefinements,
   usePagination,
} from 'react-instantsearch-hooks-web';
import { useDevicePartsItemType } from './sections/FilterableProductsSection/useDevicePartsItemType';

export interface MetaTagsProps {
   productList: ProductList;
}

export function MetaTags({ productList }: MetaTagsProps) {
   const appContext = useAppContext();
   const currentRefinements = useCurrentRefinements();
   const pagination = usePagination();
   const page = pagination.currentRefinement + 1;
   const refinementAttributes = currentRefinements.items.map(
      (item) => item.attribute
   );
   const isItemTypeFilter =
      refinementAttributes.length === 1 &&
      refinementAttributes[0] === 'facet_tags.Item Type';
   const isFiltered = currentRefinements.items.length > 0 && !isItemTypeFilter;
   const itemType = useDevicePartsItemType(productList);
   let title = getProductListTitle(productList, itemType);
   if (!isFiltered && page > 1) {
      title += ` - Page ${page}`;
   }
   title += ' | iFixit';
   const itemTypeHandle = itemType ? `/${itemType}` : '';
   const canonicalUrl = `${appContext.ifixitOrigin}${
      productList.path
   }${itemTypeHandle}${page > 1 ? `?${PRODUCT_LIST_PAGE_PARAM}=${page}` : ''}`;
   const imageUrl = productList.image?.url;
   const shouldNoIndex =
      isFiltered ||
      pagination.nbHits < 2 ||
      productList.forceNoIndex;
   return (
      <Head>
         {shouldNoIndex ? (
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
